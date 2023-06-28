import { api } from "~/utils/api";

export function DBTest() {
  const list = api.example.list.useQuery();
  const add = api.example.add.useMutation();
  return (
    <div>
      DBTest
      <pre>{JSON.stringify(list.data, null, 2)}</pre>
      <button
        onClick={() => {
          add.mutate(
            { title: `some text: ${new Date().toISOString()}` },
            {
              onSuccess: () => {
                list.refetch().catch(console.error);
              },
            }
          );
        }}
      >
        INSERT
      </button>
      {add.isSuccess && "success"}
    </div>
  );
}
