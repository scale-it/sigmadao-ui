import { GLOBAL_STATE_MAP_KEY, LOCAL_STATE_MAP_KEY } from "@/constants";
import DaoID from "@/store/DaoID";
import WalletStore from "@/store/WalletStore";
import ProposalStore from "@/store/ProposalStore";
import { Key, StateValue } from "@algo-builder/algob/build/types";
import type { LogicSigAccount } from "algosdk";
import { getProposalLsig } from "../contract/dao";
import { convertToHex } from "@/utility";
import { SchemaType, UnknownObject } from "@/types";
import {
	executeReq,
	lookupApplications,
	lookupAssetByID,
	lookupAccountAssets,
	lookupAccountAppLocalStates,
} from "@/api";

/**
 * Get global state
 * @param appId application id
 */
export const getApplicationGlobalState = async (
	appId: number
): Promise<Map<string, StateValue> | undefined> => {
	try {
		let globalState = undefined;
		// get global state of application
		const globalStateRes = await executeReq(lookupApplications(appId));
		if (
			globalStateRes?.allSigmaDaos?.nodes.length &&
			JSON.parse(globalStateRes.allSigmaDaos.nodes[0].appParams).dt.gd
		) {
			const parsedGlobalState = JSON.parse(
				globalStateRes.allSigmaDaos.nodes[0].appParams
			).dt.gd;
			globalState = decodeAppParamsState(parsedGlobalState);
		}
		return globalState;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

/**
 * Get app local state
 * @param address address
 * @param appId application id
 */
export const getAccountAppLocalState = async (
	address: string,
	appId: number
): Promise<Map<string, StateValue> | undefined> => {
	try {
		let localStateMap = undefined;
		// parse local state of DAO app for current user to get their details related to app for UI
		const hexAddr = convertToHex(address);
		const localState = await executeReq(
			lookupAccountAppLocalStates(hexAddr, appId)
		);
		if (
			localState?.allAccountApps?.nodes.length &&
			JSON.parse(localState?.allAccountApps?.nodes[0]?.localstate)?.tkv
		) {
			const parsedLocalState = JSON.parse(
				localState?.allAccountApps?.nodes[0]?.localstate
			)?.tkv;
			localStateMap = decodeAppLocalState(parsedLocalState);
		}
		return localStateMap;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

/**
 * Search app and account
 */
export const searchApplicationAndAccount = async () => {
	const daoIdStore = DaoID();
	const walletStore = WalletStore();
	const proposalStore = ProposalStore();

	// check if dao id is present or not
	if (typeof daoIdStore.dao_id === "undefined") {
		return;
	}
	const dao_id = daoIdStore.dao_id;
	const application = await getApplicationGlobalState(dao_id).catch((error) => {
		console.log(error);
		throw error;
	});

	if (application) {
		daoIdStore.global_app_state = application;
		daoIdStore.name = daoIdStore.global_app_state.get(
			GLOBAL_STATE_MAP_KEY.DaoName
		) as string;
	}

	if (walletStore.address) {
		const localStateMap = await getAccountAppLocalState(
			walletStore.address,
			dao_id
		).catch((error) => {
			console.log(error);
			throw error;
		});

		const lsig: LogicSigAccount = await getProposalLsig(
			dao_id,
			walletStore.address
		);
		proposalStore.setProposalAddr(lsig.address());
		if (daoIdStore.govt_id) {
			const availableTokens = await getGovASATokenAmount(
				walletStore.address,
				daoIdStore.govt_id
			);
			daoIdStore.available = availableTokens;
		}
		if (localStateMap) {
			daoIdStore.locked =
				(localStateMap.get(LOCAL_STATE_MAP_KEY.Deposit) as number) ?? 0;
		} else {
			daoIdStore.locked = 0;
		}
	}
};

/**
 * Check if given asset is opted in given address
 * @param address Account address
 * @param assetId asset id
 */
export const isAssetOpted = async (
	address: string,
	assetId: number
): Promise<boolean> => {
	try {
		const hexAddr = convertToHex(address);
		const assetInfo = await executeReq(lookupAccountAssets(hexAddr, assetId));
		// if greater then 0 then asset is opted.
		if (assetInfo?.allAccountAssets?.nodes?.length) {
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

/**
 * Check if given application is opted in given address
 * @param address Account address
 * @param appId application id
 */
export const isApplicationOpted = async (
	address: string,
	appId: number
): Promise<boolean> => {
	try {
		const hexAddr = convertToHex(address);
		const appInfo = await executeReq(
			lookupAccountAppLocalStates(hexAddr, appId)
		);
		if (appInfo?.allAccountApps?.nodes?.length) {
			return true;
		}
		return false;
	} catch (e) {
		console.error(e);
		throw e;
	}
};

/**
 * Get GOV ASA token amount
 * @param address Account address
 * @param assetId application id
 */
export const getGovASATokenAmount = async (
	address: string,
	assetId: number
): Promise<number> => {
	try {
		const hexAddr = convertToHex(address);
		const assetInfo = await executeReq(lookupAccountAssets(hexAddr, assetId));
		let amount = 0;
		if (assetInfo?.allAccountAssets?.nodes[0]?.amount) {
			amount = parseInt(assetInfo.allAccountAssets.nodes[0].amount);
		}
		return amount;
	} catch (e) {
		console.log(e);
		throw e;
	}
};

/**
 * Decode app local state
 * @param state State to be decoded
 */
export function decodeAppLocalState(state: any): Map<Key, StateValue> {
	const stateMap = new Map<Key, StateValue>();
	if (state) {
		for (const key in state) {
			if (state[key].tt === SchemaType.BYTES) {
				stateMap.set(
					Buffer.from(key, "base64").toString("ascii"),
					Buffer.from(state[key].tb, "base64").toString("ascii")
				);
			} else {
				stateMap.set(
					Buffer.from(key, "base64").toString("ascii"),
					state[key].ui
				);
			}
		}
	}
	return stateMap;
}

/**
 * Decode app params state
 * @param state State to be decoded
 */
export function decodeAppParamsState(state: any): Map<Key, StateValue> {
	const stateMap = new Map<Key, StateValue>();
	if (state) {
		for (const key in state) {
			if (state[key].at === SchemaType.BYTES) {
				stateMap.set(
					Buffer.from(key, "base64").toString("ascii"),
					Buffer.from(state[key].bs, "base64").toString("ascii")
				);
			} else {
				stateMap.set(
					Buffer.from(key, "base64").toString("ascii"),
					state[key].ui
				);
			}
		}
	}
	return stateMap;
}

/**
 * Get asset information
 * @param assetId Asset ID
 */
export async function getAssetInformation(
	assetId: number
): Promise<UnknownObject> {
	try {
		const assetInfo = await executeReq(lookupAssetByID(assetId));
		return JSON.parse(assetInfo.allAssets.nodes[0].params);
	} catch (e) {
		console.error(e);
		throw e;
	}
}
