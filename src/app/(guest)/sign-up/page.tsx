import SignUpForm from './_components/SignUpForm';
import type { Metadata } from 'next';
import Image from 'next/image';
import BgImage from '../../../../public/image.png';

export const metadata: Metadata = {
  title: 'Sign Up',
};

const Page = () => {
  return (
    <div className="grid lg:grid-cols-2">
      <div className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-sm">
          <SignUpForm />
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <Image
          src={BgImage}
          alt="Auth"
          placeholder="blur"
          quality={100}
          fill
          sizes="50vw"
          className="object-cover grayscale-50 brightness-75 dark:brightness-50 dark:grayscale-75"
        />
      </div>
    </div>
  );
};

export default Page;
