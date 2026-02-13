import type { Metadata } from 'next';
import ResetPasswordForm from './_components/ResetPasswordForm';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Reset Password',
};

type Props = {
  params: Promise<{
    token: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { token } = await params;

  return (
    <div className="@container">
      <div className="grid @lg:grid-cols-2">
        <div className="flex flex-1 items-center justify-center p-6 @md:p-10">
          <div className="w-full max-w-sm">
            <ResetPasswordForm token={token} />
          </div>
        </div>

        <div className="relative hidden bg-muted @lg:block">
          <Image
            src="/image.png"
            alt="Auth"
            placeholder="blur"
            quality={100}
            fill
            sizes="50vw"
            className="object-cover grayscale-50 brightness-75 dark:brightness-50 dark:grayscale-75"
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
