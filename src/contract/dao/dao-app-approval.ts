import { compileToUnit8Array } from "@/utility";

const daoAppApproval = `#pragma version 6
    txn ApplicationID
    int 0
    ==
    bnz main_l86
    txn OnCompletion
    int UpdateApplication
    ==
    txn OnCompletion
    int DeleteApplication
    ==
    ||
    bnz main_l85
    txn OnCompletion
    int CloseOut
    ==
    txn OnCompletion
    int OptIn
    ==
    ||
    bnz main_l84
    txna ApplicationArgs 0
    byte "optin_gov_token"
    ==
    bnz main_l83
    txna ApplicationArgs 0
    byte "add_proposal"
    ==
    bnz main_l72
    txna ApplicationArgs 0
    byte "deposit_vote_token"
    ==
    bnz main_l71
    txna ApplicationArgs 0
    byte "register_vote"
    ==
    bnz main_l56
    txna ApplicationArgs 0
    byte "execute"
    ==
    bnz main_l39
    txna ApplicationArgs 0
    byte "withdraw_vote_deposit"
    ==
    bnz main_l38
    txna ApplicationArgs 0
    byte "clear_vote_record"
    ==
    bnz main_l22
    txna ApplicationArgs 0
    byte "close_proposal"
    ==
    bnz main_l12
    err
    main_l12:
    global LatestTimestamp
    int 0
    byte "execute_before"
    app_local_get
    >
    bnz main_l21
    global LatestTimestamp
    int 0
    byte "voting_end"
    app_local_get
    <=
    bnz main_l20
    global LatestTimestamp
    int 0
    byte "voting_end"
    app_local_get
    >
    int 0
    byte "yes"
    app_local_get
    byte "min_support"
    app_global_get
    >=
    &&
    int 0
    byte "yes"
    app_local_get
    int 0
    byte "no"
    app_local_get
    >
    &&
    int 1
    ==
    bnz main_l19
    global LatestTimestamp
    int 0
    byte "execute_before"
    app_local_get
    <=
    global LatestTimestamp
    int 0
    byte "voting_end"
    app_local_get
    >
    &&
    global LatestTimestamp
    int 0
    byte "voting_end"
    app_local_get
    >
    int 0
    byte "yes"
    app_local_get
    byte "min_support"
    app_global_get
    >=
    &&
    int 0
    byte "yes"
    app_local_get
    int 0
    byte "no"
    app_local_get
    >
    &&
    int 0
    ==
    &&
    bnz main_l17
    err
    main_l17:
    int 2
    store 0
    main_l18:
    int 0
    int 0
    byte "id"
    app_local_get_ex
    store 11
    store 10
    global GroupSize
    int 1
    ==
    load 11
    int 1
    ==
    &&
    txn RekeyTo
    global ZeroAddress
    ==
    txn CloseRemainderTo
    global ZeroAddress
    ==
    &&
    txn AssetCloseTo
    global ZeroAddress
    ==
    &&
    &&
    int 0
    byte "executed"
    app_local_get
    int 1
    ==
    int 0
    byte "execute_before"
    app_local_get
    global LatestTimestamp
    <
    ||
    int 1
    ==
    load 0
    int 1
    !=
    int 0
    byte "voting_end"
    app_local_get
    global LatestTimestamp
    <
    &&
    int 1
    ==
    ||
    &&
    assert
    itxn_begin
    int axfer
    itxn_field TypeEnum
    byte "gov_token_id"
    app_global_get
    itxn_field XferAsset
    txn Sender
    itxn_field AssetReceiver
    byte "deposit"
    app_global_get
    itxn_field AssetAmount
    int 0
    itxn_field Fee
    itxn_submit
    int 0
    byte "name"
    app_local_del
    int 0
    byte "url"
    app_local_del
    int 0
    byte "url_hash"
    app_local_del
    int 0
    byte "hash_algo"
    app_local_del
    int 0
    byte "voting_start"
    app_local_del
    int 0
    byte "voting_end"
    app_local_del
    int 0
    byte "execute_before"
    app_local_del
    int 0
    byte "type"
    app_local_del
    int 0
    byte "from"
    app_local_del
    int 0
    byte "recipient"
    app_local_del
    int 0
    byte "asa_id"
    app_local_del
    int 0
    byte "amount"
    app_local_del
    int 0
    byte "msg"
    app_local_del
    int 0
    byte "id"
    app_local_del
    int 0
    byte "executed"
    app_local_del
    int 0
    byte "yes"
    app_local_del
    int 0
    byte "no"
    app_local_del
    int 0
    byte "abstain"
    app_local_del
    int 1
    return
    main_l19:
    int 1
    store 0
    b main_l18
    main_l20:
    int 3
    store 0
    b main_l18
    main_l21:
    int 4
    store 0
    b main_l18
    main_l22:
    int 0
    int 0
    byte "p_"
    txna Accounts 1
    concat
    app_local_get_ex
    store 9
    store 8
    global LatestTimestamp
    int 1
    byte "execute_before"
    app_local_get
    >
    bnz main_l37
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    <=
    bnz main_l36
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    >
    int 1
    byte "yes"
    app_local_get
    byte "min_support"
    app_global_get
    >=
    &&
    int 1
    byte "yes"
    app_local_get
    int 1
    byte "no"
    app_local_get
    >
    &&
    int 1
    ==
    bnz main_l35
    global LatestTimestamp
    int 1
    byte "execute_before"
    app_local_get
    <=
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    >
    &&
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    >
    int 1
    byte "yes"
    app_local_get
    byte "min_support"
    app_global_get
    >=
    &&
    int 1
    byte "yes"
    app_local_get
    int 1
    byte "no"
    app_local_get
    >
    &&
    int 0
    ==
    &&
    bnz main_l27
    err
    main_l27:
    int 2
    store 0
    main_l28:
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    <=
    global LatestTimestamp
    int 1
    byte "execute_before"
    app_local_get
    <=
    load 0
    int 1
    ==
    &&
    int 1
    byte "executed"
    app_local_get
    int 0
    ==
    &&
    ||
    bnz main_l34
    int 2
    store 1
    main_l30:
    global GroupSize
    int 1
    ==
    assert
    load 9
    int 1
    ==
    bnz main_l32
    main_l31:
    int 0
    byte "p_"
    txna Accounts 1
    concat
    app_local_del
    int 1
    return
    main_l32:
    load 8
    int 1
    byte "id"
    app_local_get
    ==
    load 1
    int 1
    ==
    &&
    int 1
    ==
    bz main_l31
    err
    main_l34:
    int 1
    store 1
    b main_l30
    main_l35:
    int 1
    store 0
    b main_l28
    main_l36:
    int 3
    store 0
    b main_l28
    main_l37:
    int 4
    store 0
    b main_l28
    main_l38:
    global GroupSize
    int 1
    ==
    txn RekeyTo
    global ZeroAddress
    ==
    txn CloseRemainderTo
    global ZeroAddress
    ==
    &&
    txn AssetCloseTo
    global ZeroAddress
    ==
    &&
    &&
    global LatestTimestamp
    txn Sender
    byte "deposit_lock"
    app_local_get
    >
    &&
    assert
    itxn_begin
    int axfer
    itxn_field TypeEnum
    byte "gov_token_id"
    app_global_get
    itxn_field XferAsset
    txn Sender
    itxn_field AssetReceiver
    txna ApplicationArgs 1
    btoi
    itxn_field AssetAmount
    int 0
    itxn_field Fee
    itxn_submit
    txn Sender
    byte "deposit"
    int 0
    byte "deposit"
    app_local_get
    txna ApplicationArgs 1
    btoi
    -
    app_local_put
    int 1
    return
    main_l39:
    global LatestTimestamp
    int 1
    byte "execute_before"
    app_local_get
    >
    bnz main_l55
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    <=
    bnz main_l54
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    >
    int 1
    byte "yes"
    app_local_get
    byte "min_support"
    app_global_get
    >=
    &&
    int 1
    byte "yes"
    app_local_get
    int 1
    byte "no"
    app_local_get
    >
    &&
    int 1
    ==
    bnz main_l53
    global LatestTimestamp
    int 1
    byte "execute_before"
    app_local_get
    <=
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    >
    &&
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    >
    int 1
    byte "yes"
    app_local_get
    byte "min_support"
    app_global_get
    >=
    &&
    int 1
    byte "yes"
    app_local_get
    int 1
    byte "no"
    app_local_get
    >
    &&
    int 0
    ==
    &&
    bnz main_l44
    err
    main_l44:
    int 2
    store 0
    main_l45:
    load 0
    int 1
    ==
    int 1
    byte "executed"
    app_local_get
    int 0
    ==
    &&
    assert
    int 1
    byte "type"
    app_local_get
    int 1
    ==
    bnz main_l52
    int 1
    byte "type"
    app_local_get
    int 2
    ==
    bnz main_l51
    int 1
    byte "type"
    app_local_get
    int 3
    ==
    bnz main_l49
    err
    main_l49:
    global GroupSize
    int 1
    ==
    assert
    main_l50:
    int 1
    byte "executed"
    int 1
    app_local_put
    int 1
    return
    main_l51:
    global GroupSize
    int 2
    ==
    gtxn 1 TypeEnum
    int axfer
    ==
    &&
    gtxn 1 AssetSender
    global ZeroAddress
    ==
    &&
    gtxn 1 Sender
    int 1
    byte "from"
    app_local_get
    ==
    &&
    gtxn 1 AssetReceiver
    int 1
    byte "recipient"
    app_local_get
    ==
    &&
    gtxn 1 AssetAmount
    int 1
    byte "amount"
    app_local_get
    ==
    &&
    gtxn 1 XferAsset
    int 1
    byte "asa_id"
    app_local_get
    ==
    &&
    assert
    b main_l50
    main_l52:
    global GroupSize
    int 2
    ==
    gtxn 1 TypeEnum
    int pay
    ==
    &&
    gtxn 1 Sender
    int 1
    byte "from"
    app_local_get
    ==
    &&
    gtxn 1 Receiver
    int 1
    byte "recipient"
    app_local_get
    ==
    &&
    gtxn 1 Amount
    int 1
    byte "amount"
    app_local_get
    ==
    &&
    assert
    b main_l50
    main_l53:
    int 1
    store 0
    b main_l45
    main_l54:
    int 3
    store 0
    b main_l45
    main_l55:
    int 4
    store 0
    b main_l45
    main_l56:
    int 0
    int 0
    byte "p_"
    txna Accounts 1
    concat
    app_local_get_ex
    store 9
    store 8
    global GroupSize
    int 1
    ==
    int 1
    byte "voting_start"
    app_local_get
    global LatestTimestamp
    <=
    &&
    global LatestTimestamp
    int 1
    byte "voting_end"
    app_local_get
    <=
    &&
    int 0
    byte "deposit"
    app_local_get
    int 0
    >
    &&
    assert
    load 9
    int 0
    ==
    bnz main_l70
    load 8
    int 1
    byte "id"
    app_local_get
    !=
    bnz main_l69
    err
    main_l59:
    gtxna 0 ApplicationArgs 1
    byte "yes"
    ==
    bnz main_l68
    gtxna 0 ApplicationArgs 1
    byte "no"
    ==
    bnz main_l67
    gtxna 0 ApplicationArgs 1
    byte "abstain"
    ==
    bnz main_l63
    err
    main_l63:
    int 1
    byte "abstain"
    int 1
    byte "abstain"
    app_local_get
    int 0
    byte "deposit"
    app_local_get
    +
    app_local_put
    main_l64:
    int 0
    byte "deposit_lock"
    app_local_get
    int 1
    byte "voting_end"
    app_local_get
    <=
    bnz main_l66
    main_l65:
    int 1
    return
    main_l66:
    int 0
    byte "deposit_lock"
    int 1
    byte "voting_end"
    app_local_get
    app_local_put
    b main_l65
    main_l67:
    int 1
    byte "no"
    int 1
    byte "no"
    app_local_get
    int 0
    byte "deposit"
    app_local_get
    +
    app_local_put
    b main_l64
    main_l68:
    int 1
    byte "yes"
    int 1
    byte "yes"
    app_local_get
    int 0
    byte "deposit"
    app_local_get
    +
    app_local_put
    b main_l64
    main_l69:
    int 0
    byte "p_"
    txna Accounts 1
    concat
    int 1
    byte "id"
    app_local_get
    app_local_put
    b main_l59
    main_l70:
    int 0
    byte "p_"
    txna Accounts 1
    concat
    int 1
    byte "id"
    app_local_get
    app_local_put
    b main_l59
    main_l71:
    global GroupSize
    int 1
    >
    int 1
    gtxns RekeyTo
    global ZeroAddress
    ==
    &&
    int 1
    gtxns TypeEnum
    int axfer
    ==
    &&
    int 1
    gtxns XferAsset
    byte "gov_token_id"
    app_global_get
    ==
    &&
    int 1
    gtxns AssetReceiver
    global CurrentApplicationAddress
    ==
    &&
    int 1
    gtxns AssetAmount
    int 0
    >=
    &&
    assert
    int 0
    byte "deposit"
    int 0
    byte "deposit"
    app_local_get
    gtxn 1 AssetAmount
    +
    app_local_put
    int 1
    return
    main_l72:
    int 0
    byte "type"
    app_local_get
    int 0
    ==
    assert
    global GroupSize
    int 1
    >
    int 1
    gtxns RekeyTo
    global ZeroAddress
    ==
    &&
    int 1
    gtxns TypeEnum
    int axfer
    ==
    &&
    int 1
    gtxns XferAsset
    byte "gov_token_id"
    app_global_get
    ==
    &&
    int 1
    gtxns AssetReceiver
    global CurrentApplicationAddress
    ==
    &&
    int 1
    gtxns AssetAmount
    int 0
    >=
    &&
    assert
    gtxn 1 RekeyTo
    global ZeroAddress
    ==
    gtxn 1 AssetAmount
    byte "deposit"
    app_global_get
    ==
    &&
    assert
    int 0
    byte "name"
    txna ApplicationArgs 1
    app_local_put
    int 0
    byte "url"
    txna ApplicationArgs 2
    app_local_put
    int 0
    byte "url_hash"
    txna ApplicationArgs 3
    app_local_put
    txna ApplicationArgs 4
    byte ""
    ==
    bnz main_l82
    int 0
    byte "hash_algo"
    txna ApplicationArgs 4
    app_local_put
    main_l74:
    txna ApplicationArgs 5
    btoi
    store 2
    txna ApplicationArgs 6
    btoi
    store 3
    txna ApplicationArgs 7
    btoi
    store 4
    txna ApplicationArgs 8
    btoi
    store 5
    load 2
    global LatestTimestamp
    >
    assert
    int 0
    byte "voting_start"
    load 2
    app_local_put
    load 3
    load 2
    >
    byte "min_duration"
    app_global_get
    load 3
    load 2
    -
    <=
    &&
    byte "max_duration"
    app_global_get
    load 3
    load 2
    -
    >=
    &&
    assert
    int 0
    byte "voting_end"
    load 3
    app_local_put
    load 4
    load 3
    >
    assert
    int 0
    byte "execute_before"
    load 4
    app_local_put
    load 5
    int 1
    ==
    load 5
    int 2
    ==
    ||
    load 5
    int 3
    ==
    ||
    assert
    int 0
    byte "type"
    load 5
    app_local_put
    int 0
    byte "type"
    app_local_get
    int 1
    ==
    bnz main_l81
    int 0
    byte "type"
    app_local_get
    int 2
    ==
    bnz main_l80
    int 0
    byte "type"
    app_local_get
    int 3
    ==
    bnz main_l78
    err
    main_l78:
    int 0
    byte "msg"
    txna ApplicationArgs 9
    app_local_put
    main_l79:
    int 0
    byte "id"
    txn TxID
    app_local_put
    int 0
    byte "executed"
    int 0
    app_local_put
    int 1
    return
    main_l80:
    int 0
    byte "from"
    txna ApplicationArgs 9
    app_local_put
    int 0
    byte "asa_id"
    txna ApplicationArgs 10
    btoi
    app_local_put
    int 0
    byte "recipient"
    txna ApplicationArgs 11
    app_local_put
    int 0
    byte "amount"
    txna ApplicationArgs 12
    btoi
    app_local_put
    b main_l79
    main_l81:
    int 0
    byte "from"
    txna ApplicationArgs 9
    app_local_put
    int 0
    byte "recipient"
    txna ApplicationArgs 10
    app_local_put
    int 0
    byte "amount"
    txna ApplicationArgs 11
    btoi
    app_local_put
    b main_l79
    main_l82:
    int 0
    byte "hash_algo"
    byte "sha256"
    app_local_put
    b main_l74
    main_l83:
    global GroupSize
    int 1
    ==
    txn RekeyTo
    global ZeroAddress
    ==
    &&
    txna Assets 0
    byte "gov_token_id"
    app_global_get
    ==
    &&
    assert
    itxn_begin
    int axfer
    itxn_field TypeEnum
    byte "gov_token_id"
    app_global_get
    itxn_field XferAsset
    global CurrentApplicationAddress
    itxn_field AssetReceiver
    int 0
    itxn_field AssetAmount
    int 0
    itxn_field Fee
    itxn_submit
    int 1
    return
    main_l84:
    global GroupSize
    int 1
    ==
    assert
    int 1
    return
    main_l85:
    int 0
    return
    main_l86:
    txna ApplicationArgs 2
    btoi
    int 0
    >
    txna ApplicationArgs 2
    btoi
    txna ApplicationArgs 3
    btoi
    <
    &&
    txna ApplicationArgs 6
    btoi
    asset_params_get AssetTotal
    store 7
    store 6
    load 7
    &&
    assert
    byte "deposit"
    txna ApplicationArgs 0
    btoi
    app_global_put
    byte "min_support"
    txna ApplicationArgs 1
    btoi
    app_global_put
    byte "min_duration"
    txna ApplicationArgs 2
    btoi
    app_global_put
    byte "max_duration"
    txna ApplicationArgs 3
    btoi
    app_global_put
    byte "url"
    txna ApplicationArgs 4
    app_global_put
    byte "dao_name"
    txna ApplicationArgs 5
    app_global_put
    byte "gov_token_id"
    txna ApplicationArgs 6
    btoi
    app_global_put
    int 1
    return`;

export const getCompiledDaoApproval = async () => {
	return await compileToUnit8Array(daoAppApproval);
};
