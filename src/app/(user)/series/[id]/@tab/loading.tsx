import { Loader2 } from 'lucide-react';

const Loading = () => {
  return (
    <div className="py-6 flex-1 flex items-center justify-center">
      <Loader2 className="size-20 animate-spin" />
    </div>
  );
};

export default Loading;
