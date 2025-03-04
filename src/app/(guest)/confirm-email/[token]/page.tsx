import { confirmEmail } from '@lib/actions/confirm-email';
import { Frown, Smile } from 'lucide-react';

type Props = {
  params: Promise<{
    token: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { token } = await params;
  const result = await confirmEmail(token);

  if (result?.error) {
    return (
      <div className="flex items-center justify-center flex-col gap-3 container text-destructive">
        <Frown className="size-[40%]" />
        <div className="font-bold text-4xl text-center">
          Failed to confirm email
        </div>
      </div>
    );
  }

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
