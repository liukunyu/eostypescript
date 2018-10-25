import "allocator/arena";

import {
    printi,
    prints,
    get_action_asset_id,
    get_action_asset_amount,
    get_trx_sender,
    withdraw_asset,
    db_store_i64,
    Contract
    } from "../../gxctslib/env";
    
import { string2cstr, N, assert } from "../../gxctslib/utils";
import { Create } from "../../gxctslib/actions";

export function apply(receiver: u64, code: u64, action: u64): void {
  var gol: HelloWorld = new HelloWorld(receiver);
  gol.apply(code, action);
}

/***************** HELLOWORLD CLASS ***********************/
class HelloWorld extends Contract {
    
  @action
  on_create(args: Create): void {
    //test receiver
    printi(this.receiver);
    
    //test parameters
    printi(args.num_rows);
    printi(args.num_cols);
    printi(args.seed);
    
    //test api
    printi(get_action_asset_id());
    printi(get_action_asset_amount());
    printi(get_trx_sender());
    
    //test deposit/withdraw
    withdraw_asset(this.receiver, get_trx_sender(), get_action_asset_id(),get_action_asset_amount() / 2);//返还1半给送钱的
    
    //test storage create/delete/query/modify
    //db_store_i64(scope : u64, table : u64, payer: u64, id : u64,  data : u32, len : u32) : i32;
    let buffer_address = string2cstr("my first book");
    prints(buffer_address);
    let book_idx_1 = db_store_i64(this.receiver, N("book"), 0, 1, buffer_address, 13);//TODO FIXME get_table_objects failed
  }

  apply(code: u64, action: u64): void {
    if (action == N("create")) {
      this.on_create(Create.from_ds(this.get_ds()));
    } else {
      assert(false, "unknown action");
    }
  }
}
