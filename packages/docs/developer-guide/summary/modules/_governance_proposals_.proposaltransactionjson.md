# ProposalTransactionJSON

JSON encoding of a proposal transaction.

Example:

```javascript
{
  "contract": "Election",
  "function": "setElectableValidators",
  "args": [ "1", "120" ],
  "value": "0"
}
```

## Hierarchy

* **ProposalTransactionJSON**

## Index

### Properties

* [args](../interfaces/_governance_proposals_.proposaltransactionjson.md#args)
* [contract](../interfaces/_governance_proposals_.proposaltransactionjson.md#contract)
* [function](../interfaces/_governance_proposals_.proposaltransactionjson.md#function)
* [params](../interfaces/_governance_proposals_.proposaltransactionjson.md#optional-params)
* [value](../interfaces/_governance_proposals_.proposaltransactionjson.md#value)

## Properties

### args

• **args**: _any\[\]_

_Defined in_ [_packages/contractkit/src/governance/proposals.ts:49_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/governance/proposals.ts#L49)

### contract

• **contract**: [_CeloContract_](../enums/_base_.celocontract.md)

_Defined in_ [_packages/contractkit/src/governance/proposals.ts:47_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/governance/proposals.ts#L47)

### function

• **function**: _string_

_Defined in_ [_packages/contractkit/src/governance/proposals.ts:48_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/governance/proposals.ts#L48)

### `Optional` params

• **params**? : _Record‹string, any›_

_Defined in_ [_packages/contractkit/src/governance/proposals.ts:50_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/governance/proposals.ts#L50)

### value

• **value**: _string_

_Defined in_ [_packages/contractkit/src/governance/proposals.ts:51_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/governance/proposals.ts#L51)
