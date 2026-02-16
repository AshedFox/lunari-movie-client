import { confirmEmailAction } from '@features/confirm-email';
import { Smile } from 'lucide-react';

type Props = {
  params: Promise<{
    token: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { token } = await params;
  await confirmEmailAction(token);

  return (
    <div className="flex items-center justify-center flex-col gap-3 container text-green-500">
      <Smile className="size-[40%]" />
      <div className="font-bold text-4xl text-center">
        Successfully confirmed email
      </div>
    </div>
  );
};

export default Page;
