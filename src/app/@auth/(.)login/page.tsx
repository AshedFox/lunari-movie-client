import LoginForm from '@app/(guest)/login/_components/LoginForm';
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
          <DialogTitle className="sr-only">Login</DialogTitle>
          <DialogDescription className="sr-only">
            Login to the account
          </DialogDescription>
        </DialogHeader>
        <LoginForm />
      </DialogContent>
    </NextModal>
  );
};

export default Page;
