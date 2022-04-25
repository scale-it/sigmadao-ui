import { defineStore } from "pinia";
import { ProposalFormState } from "../types";

export default defineStore("ProposalStore", {
	state: (): ProposalFormState => {
		return {
			proposal_type: "",
			url: "",
			url_hash: "",
			vote_date: ["", ""],
			proposal_address: "",
			proposal_id: undefined,
			recipient: "",
			amount: undefined,
			asaId: undefined,
			message: "",
		};
	},
	actions: {
		setFormValue(value: ProposalFormState) {
			this.proposal_type = value.proposal_type;
			this.url = value.url;
			this.url_hash = value.url_hash;
			this.vote_date = value.vote_date;
			this.proposal_address = value.proposal_address;
			this.proposal_id = value.proposal_id;
			this.recipient = value.recipient;
			this.amount = value.amount;
			this.asaId = value.asaId;
			this.message = value.message;
			console.log("state", this.$state);
		},
	},
});
