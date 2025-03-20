import ForgotPasswordForm from '@app/(guest)/forgot-password/_components/ForgotPasswordForm';
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="sr-only">Forgot password</DialogTitle>
          <DialogDescription className="sr-only">
            Forgot password to your account?
          </DialogDescription>
        </DialogHeader>
        <ForgotPasswordForm />
      </DialogContent>
    </NextModal>
  );
};

export default Page;
