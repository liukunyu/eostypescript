import "allocator/arena";

import { env as GXC, Contract } from "../../gxctslib/gxclib";
import { N, assert } from "../../gxctslib/utils";
import { Create } from "../../gxctslib/actions";

export function apply(receiver: u64, code: u64, action: u64): void {
  var gol: HelloWorld = new HelloWorld(receiver);
  gol.apply(code, action);
}

/***************** HELLOWORLD CLASS ***********************/
class HelloWorld extends Contract {
  // create action
  on_create(args: Create): void {
    GXC.printi(this.receiver);
    
    GXC.printi(args.num_rows);
    GXC.printi(args.num_cols);
    GXC.printi(args.seed);
    
    
    GXC.printi(GXC.get_action_asset_id());
    GXC.printi(GXC.get_action_asset_amount());
    GXC.printi(GXC.get_trx_sender());
    
    GXC.withdraw_asset(this.receiver, GXC.get_trx_sender(), GXC.get_action_asset_id(),GXC.get_action_asset_amount() / 2);//返还1半给送钱的
  }

  apply(code: u64, action: u64): void {
    if (action == N("create")) {
      this.on_create(Create.from_ds(this.get_ds()));
    } else {
      assert(false, "unknown action");
    }
  }
}
