import { Button } from '../components/Button'
import { GridRow } from '../components/Grid'
import { H1 } from '../components/Typography'

export default function ConfigPage() {
    return (
        <GridRow className="px-5 w-full flex-auto overflow-x-scroll text-sm" title="Analitycs">
            <div className="py-8 overflow-x-scroll">
                <H1>Config</H1>

                <div className="flex-center gap-5">
                    <Button>Reset Database</Button>
                    <Button>Reset Product</Button>
                    <Button>Reset Transaction</Button>
                </div>
            </div>
        </GridRow>
    )
}
