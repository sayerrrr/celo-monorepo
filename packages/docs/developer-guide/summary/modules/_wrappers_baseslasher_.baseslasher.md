# BaseSlasher

## Type parameters

▪ **T**: _SlasherContract_

## Hierarchy

* [BaseWrapper](../classes/_wrappers_basewrapper_.basewrapper.md)‹T›

  ↳ **BaseSlasher**

  ↳ [DoubleSigningSlasherWrapper](../classes/_wrappers_doublesigningslasher_.doublesigningslasherwrapper.md)

  ↳ [DowntimeSlasherWrapper](../classes/_wrappers_downtimeslasher_.downtimeslasherwrapper.md)

## Index

### Constructors

* [constructor](../classes/_wrappers_baseslasher_.baseslasher.md#constructor)

### Properties

* [eventTypes](../classes/_wrappers_baseslasher_.baseslasher.md#eventtypes)
* [events](../classes/_wrappers_baseslasher_.baseslasher.md#events)
* [methodIds](../classes/_wrappers_baseslasher_.baseslasher.md#methodids)
* [slashingIncentives](../classes/_wrappers_baseslasher_.baseslasher.md#slashingincentives)

### Accessors

* [address](../classes/_wrappers_baseslasher_.baseslasher.md#address)

### Methods

* [getPastEvents](../classes/_wrappers_baseslasher_.baseslasher.md#getpastevents)

## Constructors

### constructor

+ **new BaseSlasher**\(`kit`: [ContractKit](../classes/_kit_.contractkit.md), `contract`: T\): [_BaseSlasher_](../classes/_wrappers_baseslasher_.baseslasher.md)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_constructor_](../classes/_wrappers_basewrapper_.basewrapper.md#constructor)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:26_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L26)

**Parameters:**

| Name | Type |
| :--- | :--- |
| `kit` | [ContractKit](../classes/_kit_.contractkit.md) |
| `contract` | T |

**Returns:** [_BaseSlasher_](../classes/_wrappers_baseslasher_.baseslasher.md)

## Properties

### eventTypes

• **eventTypes**: _EventsEnum‹T›_ = Object.keys\(this.events\).reduce&gt;\( \(acc, key\) =&gt; \({ ...acc, \[key\]: key }\), {} as any \)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_eventTypes_](../classes/_wrappers_basewrapper_.basewrapper.md#eventtypes)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:42_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L42)

### events

• **events**: _T\["events"\]_ = this.contract.events

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_events_](../classes/_wrappers_basewrapper_.basewrapper.md#events)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:40_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L40)

### methodIds

• **methodIds**: _Record‹keyof T\["methods"\], string›_ = Object.keys\(this.contract.methods\).reduce, string&gt;&gt;\( \(acc, method: Methods\) =&gt; { const methodABI = this.contract.options.jsonInterface.find\(\(item\) =&gt; item.name === method\)

```text
  acc[method] =
    methodABI === undefined ? '0x' : this.kit.web3.eth.abi.encodeFunctionSignature(methodABI)

  return acc
},
{} as any
```

\)

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_methodIds_](../classes/_wrappers_basewrapper_.basewrapper.md#methodids)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:47_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L47)

### slashingIncentives

• **slashingIncentives**: _function_ = proxyCall\( this.contract.methods.slashingIncentives, undefined, \(res\) =&gt; \({ reward: valueToBigNumber\(res.reward\), penalty: valueToBigNumber\(res.penalty\), }\) \)

_Defined in_ [_packages/contractkit/src/wrappers/BaseSlasher.ts:70_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseSlasher.ts#L70)

Returns slashing incentives.

**`returns`** Rewards and penalties for slashing.

#### Type declaration:

▸ \(...`args`: InputArgs\): _Promise‹Output›_

**Parameters:**

| Name | Type |
| :--- | :--- |
| `...args` | InputArgs |

## Accessors

### address

• **get address**\(\): _string_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_address_](../classes/_wrappers_basewrapper_.basewrapper.md#address)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:30_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L30)

Contract address

**Returns:** _string_

## Methods

### getPastEvents

▸ **getPastEvents**\(`event`: Events‹T›, `options`: PastEventOptions\): _Promise‹EventLog\[\]›_

_Inherited from_ [_BaseWrapper_](../classes/_wrappers_basewrapper_.basewrapper.md)_._[_getPastEvents_](../classes/_wrappers_basewrapper_.basewrapper.md#getpastevents)

_Defined in_ [_packages/contractkit/src/wrappers/BaseWrapper.ts:36_](https://github.com/celo-org/celo-monorepo/blob/master/packages/contractkit/src/wrappers/BaseWrapper.ts#L36)

Contract getPastEvents

**Parameters:**

| Name | Type |
| :--- | :--- |
| `event` | Events‹T› |
| `options` | PastEventOptions |

**Returns:** _Promise‹EventLog\[\]›_
