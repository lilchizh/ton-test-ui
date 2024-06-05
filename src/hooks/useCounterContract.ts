import { useEffect, useState } from "react";
import { useTonClient } from "./useTonClient";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { Address, OpenedContract } from "@ton/core";
import Counter from "../contracts/Counter";
import { useTonConnect } from "./useTonConnect";

const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

export function useCounterContract () {

    const client = useTonClient();
    const [val, setVal] = useState<null | number>();
    const { sender } = useTonConnect()

    const counterContract = useAsyncInitialize(async () => {
        if (!client) return

        const contract = new Counter(
            Address.parse('EQB3NV32R2WDVeSmrpQUieoiukpm1PGPHxloedEztB3mDv2U')
        )

        return client.open(contract) as OpenedContract<Counter>
    }, [client])

    useEffect(() => {
        async function getValue() {
            if (!counterContract) return
            setVal(null)
            const val = await counterContract.getCounter();
            setVal(Number(val))
            await sleep(5000);
            getValue();
        }
        getValue();
    }, [counterContract])

    return {
        value: val,
        address: counterContract?.address.toString(),
        sendIncrement: () => counterContract?.sendIncrement(sender)
    }

}