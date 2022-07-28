import { defineStore } from "pinia";
import { ProposalFormState } from "../types";

export default defineStore("ProposalStore", {
	state: (): ProposalFormState => {
		return {
			proposal_name: "",
			proposal_type: "",
			url: "",
			url_hash: "",
			vote_date: ["", ""],
			proposalAddress: "",
			recipient: "",
			amount: undefined,
			asaId: undefined,
			message: "",
			execute_before: "",
		};
	},
	actions: {
		setFormValue(value: ProposalFormState) {
			this.proposal_type = value.proposal_type;
			this.url = value.url;
			this.url_hash = value.url_hash;
			this.vote_date = value.vote_date;
			this.proposalAddress = value.proposalAddress;
			this.recipient = value.recipient;
			this.amount = value.amount;
			this.asaId = value.asaId;
			this.message = value.message;
			this.execute_before = value.execute_before;
			console.log("state", this.$state);
		},
		setProposalAddr(value: string) {
			this.proposalAddress = value;
		},
	},
});
