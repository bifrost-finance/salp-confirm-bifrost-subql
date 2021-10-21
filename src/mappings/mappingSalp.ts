import { SubstrateBlock, SubstrateEvent } from "@subql/types";
import { BlockNumber, Balance, ParaId, MessageId } from "@polkadot/types/interfaces";
import { Compact } from '@polkadot/types';
import { SalpLiteIssued } from "../types/models";

export async function handleSalpLiteIssued(event: SubstrateEvent): Promise<void> {
  const blockNumber = event.block.block.header.number.toNumber();

  const { event: { data: [account, para_id, balance, message_id] } } = event;
  const record = new SalpLiteIssued(blockNumber.toString() + '-' + event.idx.toString());
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
