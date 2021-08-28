import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber, Balance, ParaId, MessageId } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import { SalpInfo } from "../types/models/SalpInfo";
import { SalpContributing } from "../types/models/SalpContributing";
import { SalpContributed } from "../types/models/SalpContributed";

export async function salp(block: SubstrateBlock): Promise<void> {
  const blockNumber = block.block.header.number.toNumber();

  const salpEvents = block.events.filter(e => e.event.section === 'salp') as SubstrateEvent[];
  // const salpEvents = block.events as SubstrateEvent[];
  for (let salpEvent of salpEvents) {
    const { event: { data, section, method } } = salpEvent;
    const record = new SalpInfo(blockNumber.toString() + '-' + salpEvent.idx.toString());
    record.block_height = blockNumber;
    record.block_timestamp = block.timestamp;
    record.method = method.toString();
    record.data = data.toString();
    await record.save();
  }
  return;
}

export async function handleSalpContributing(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { data: [account, para_id, balance, message_id] } } = event;
  const record = new SalpContributing(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic.idx;
  record.block_timestamp = event.block.timestamp;
  record.account = account.toString();
  record.para_id = (para_id as ParaId).toNumber();
  record.balance = (balance as Balance).toBigInt();
  record.message_id = (message_id as MessageId).toString();
  await record.save();
}

export async function handleSalpContributed(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { data: [account, para_id, balance] } } = event;
  const record = new SalpContributed(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.event_id = event.idx;
  record.extrinsic_id = event.extrinsic.idx;
  record.block_timestamp = event.block.timestamp;
  record.account = account.toString();
  record.para_id = (para_id as ParaId).toNumber();
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}