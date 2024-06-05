import { SenderArguments } from "@ton/core";
import { useTonConnectUI } from "@tonconnect/ui-react";

export function useTonConnect () {

    const [tonConnect] = useTonConnectUI()

    return {
        sender: {
            send: async (args: SenderArguments) => {
                tonConnect.sendTransaction({
                    messages: [
                        {
                            address: args.to.toString(),
                            amount: args.value.toString(),
                            payload: args.body?.toBoc().toString('base64')
                        }
                    ],
                    validUntil: Date.now() + 5 * 60 * 1000
                })
            }
        },
        connected: tonConnect.connected
    }

}