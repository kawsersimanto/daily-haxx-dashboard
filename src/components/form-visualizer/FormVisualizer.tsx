interface FormVisualizerProps<T> {
  values: T;
}

export const FormVisualizer = <T,>({ values }: FormVisualizerProps<T>) => {
  return (
    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-auto">
      <code className="text-white text-sm">
        {JSON.stringify(values, null, 2)}
      </code>
    </pre>
  );
};
