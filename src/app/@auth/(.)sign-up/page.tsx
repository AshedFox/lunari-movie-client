import SignUpForm from '@app/(guest)/sign-up/_components/SignUpForm';
import NextModal from '@components/common/NextModal';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@components/ui/dialog';

const Page = () => {
  return (
    <NextModal>
      <DialogContent className="@sm:max-w-[425px] @container">
        <DialogHeader>
          <DialogTitle className="sr-only">Sign Up</DialogTitle>
          <DialogDescription className="sr-only">
            Create new account
          </DialogDescription>
        </DialogHeader>
        <SignUpForm />
      </DialogContent>
    </NextModal>
  );
};

export default Page;
