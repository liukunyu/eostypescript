import "allocator/arena";

import { env as GXC, Contract } from "../../gxctslib/gxclib";
import { string2cstr, N, assert } from "../../gxctslib/utils";
import { Create } from "../../gxctslib/actions";

export function apply(receiver: u64, code: u64, action: u64): void {
  var gol: HelloWorld = new HelloWorld(receiver);
  gol.apply(code, action);
}

/***************** HELLOWORLD CLASS ***********************/
class HelloWorld extends Contract {
  // create action
  on_create(args: Create): void {
    //test receiver
    GXC.printi(this.receiver);
    
    //test parameters
    GXC.printi(args.num_rows);
    GXC.printi(args.num_cols);
    GXC.printi(args.seed);
    
    //test api
    GXC.printi(GXC.get_action_asset_id());
    GXC.printi(GXC.get_action_asset_amount());
    GXC.printi(GXC.get_trx_sender());
    
    //test deposit/withdraw
    GXC.withdraw_asset(this.receiver, GXC.get_trx_sender(), GXC.get_action_asset_id(),GXC.get_action_asset_amount() / 2);//返还1半给送钱的
    
    //test storage create/delete/query/modify
    //db_store_i64(scope : u64, table : u64, payer: u64, id : u64,  data : u32, len : u32) : i32;
    let buffer_address = string2cstr("my first book");
    let book_idx_1 = GXC.db_store_i64(this.receiver, N("book"), 0, 1, buffer_address, 13);//TODO FIXME get_table_objects failed
    
//    declare function db_find_i64(code: u64, scope:u64, table:u64, id:u64) : i32;
//    declare function db_remove_i64(iterator : i32) : void;
//    
//    declare function db_lowerbound_i64(code: u64, scope:u64, table:u64, id:u64) : i32;
//    declare function db_next_i64(iterator : i32, primary: i32) : i32;
//    declare function db_get_i64(iterator : i32, data : u32, len : u32) : i32;
//    declare function db_update_i64(iterator : i32, payer : u64, data : u32, len : u32) : void;
  }

  apply(code: u64, action: u64): void {
    if (action == N("create")) {
      this.on_create(Create.from_ds(this.get_ds()));
    } else {
      assert(false, "unknown action");
    }
  }
}
