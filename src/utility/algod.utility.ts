import { types, tx as webTx } from "@algo-builder/web";
import { types as aTypes } from "@algo-builder/algob";
import { algodClient } from "@/config/algob.config";
import type { LogicSigAccount } from "algosdk";
import { EncodingType } from "@/types";
import algosdk from "algosdk";
const base32 = require("hi-base32");
const confirmedRound = "confirmed-round";

export const fundAmount = async (
	from: string,
	to: string,
	amount: number,
	webMode: any // eslint-disable-line
) => {
	const txParams: types.ExecParams[] = [
		{
			type: types.TransactionType.TransferAlgo,
			sign: types.SignType.SecretKey,
			fromAccount: {
				addr: from,
				sk: new Uint8Array(0),
			},
			toAccountAddr: to,
			amountMicroAlgos: amount,
			payFlags: { totalFee: 1000 },
		},
	];
	const response = await webMode.executeTx(txParams);
	console.log("Funded: ", response);
};

export const optInToAppUsingLogicSig = async (
	lsig: LogicSigAccount,
	execParam: types.ExecParams
) => {
	try {
		const params = await algodClient.getTransactionParams().do();
		const optInLsigToAppTx = await webTx.mkTransaction(execParam, params);
		const rawLsigSignedTx = algosdk.signLogicSigTransactionObject(
			optInLsigToAppTx,
			lsig
		).blob;
		const txInfo = await algodClient.sendRawTransaction(rawLsigSignedTx).do();
		const confirmationWait = await waitForConfirmation(txInfo.txId);
		console.log("optInResponse: ", confirmationWait);
	} catch (error) {
		console.error(error);
	}
};

const waitForConfirmation = async (txId: string) => {
	const pendingInfo = await algosdk.waitForConfirmation(algodClient, txId, 6);
	if (pendingInfo["pool-error"]) {
		throw new Error(
			`Transaction Pool Error: ${pendingInfo["pool-error"] as string}`
		);
	}
	if (pendingInfo[confirmedRound] !== null && pendingInfo[confirmedRound] > 0) {
		return pendingInfo as aTypes.ConfirmedTxInfo;
	}
	throw new Error("timeout");
};

export const compileSignature = async (proposalSrc: string) => {
	const response = await algodClient.compile(proposalSrc).do();
	if (!response["hash"]) {
		throw Error();
	}
	const program = new Uint8Array(Buffer.from(response["result"], "base64"));
	return new algosdk.LogicSigAccount(program);
};

export const compileToUnit8Array = async (appProgram: string) => {
	const response = await algodClient.compile(appProgram).do();
	return new Uint8Array(Buffer.from(response["result"], "base64"));
};

export const optInToAppUsingSecretKey = async (
	from: string,
	appID: number,
	webMode: any // eslint-disable-line
) => {
	const execParam: types.ExecParams = {
		type: types.TransactionType.OptInToApp,
		sign: types.SignType.SecretKey,
		fromAccount: {
			addr: from,
			sk: new Uint8Array(0),
		},
		appID: appID,
		payFlags: {},
	};
	try {
		const response = await webMode.executeTx([execParam]);
		console.log(response);
	} catch (error) {
		console.error("Transaction Failed", error);
		throw error;
	}
};

/**
 * Description : converts string into buffer as per encoding type
 * @param s : string to be converted
 * @param encoding : encoding type
 */
const convertToBuffer = (s: string, encoding?: EncodingType): Buffer => {
	switch (encoding) {
		case EncodingType.BASE64: {
			return Buffer.from(s, "base64");
		}
		case EncodingType.BASE32: {
			return Buffer.from(base32.decode(s));
		}
		case EncodingType.HEX: {
			return Buffer.from(s, "hex");
		}
		case EncodingType.UTF8: {
			return Buffer.from(s);
		}
		default: {
			// default encoding (utf-8)
			return Buffer.from(s);
		}
	}
};

export const convertToHex = (address: string) => {
	const pk = algosdk.decodeAddress(address);
	return Buffer.from(pk.publicKey).toString("hex");
};

export const convertHexToAlgorandAddr = (hex: string) => {
	try {
		return algosdk.encodeAddress(convertToBuffer(hex, EncodingType.HEX));
	} catch (error) {
		console.log(error);
	}
};
