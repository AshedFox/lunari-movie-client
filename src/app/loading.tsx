import { LoaderPinwheel } from 'lucide-react';

const Loading = () => {
  return (
    <div className="container py-10 flex items-center justify-center">
      <LoaderPinwheel className="size-24 animate-spin" />
    </div>
  );
};

export default Loading;
