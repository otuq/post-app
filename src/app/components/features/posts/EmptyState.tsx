import { Button } from "../../ui/button";

export function EmptyState() {
    return (
        <div className="rounded-xl border border-dashed bg-white p-10 text-center">
            <h2 className="text-lg font-bold">投稿がありません</h2>
            <p className="mt-2 text-sm text-zinc-500">
                最初の投稿を作成してみましょう。
            </p>
            <Button className="mt-6">投稿を作成</Button>
        </div>
    );
}