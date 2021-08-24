import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber, Balance, ParaId } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import { SalpInfo } from "../types/models/SalpInfo";
import { SalpContributing } from "../types/models/SalpContributing";

export async function salp(block: SubstrateBlock): Promise<void> {
  const blockNumber = (block.block.header.number as Compact<BlockNumber>).toBigInt();

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
  const blockNumber = (event.block.block.header.number as Compact<BlockNumber>).toBigInt();

  const { event: { data: [account, para_id, balance] } } = event;
  const record = new SalpContributing(blockNumber.toString() + '-' + event.idx.toString());
  record.block_height = blockNumber;
  record.block_timestamp = event.block.timestamp;
  record.account = account.toString();
  record.para_id = (para_id as ParaId).toNumber();
  record.balance = (balance as Balance).toBigInt();
  await record.save();
}