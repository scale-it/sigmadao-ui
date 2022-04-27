import { types, tx as webTx, mkTxParams, WebMode } from "@algo-builder/web";
import { types as aTypes } from "@algo-builder/algob";
import algodClient from "@/config/algob.config";
import type { LogicSigAccount } from "algosdk";
import algosdk from "algosdk";
const confirmedRound = "confirmed-round";

export const fundAmount = async (
	from: string,
	to: string,
	amount: number,
	webMode: WebMode
) => {
	const txParamss: types.ExecParams[] = [
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
	const response = await webMode.executeTx(txParamss);
	console.log("Funded: ", response);
};

export const optInToApp = async (
	lsig: LogicSigAccount,
	execParam: types.ExecParams
) => {
	try {
		const params = await mkTxParams(algodClient, {});
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