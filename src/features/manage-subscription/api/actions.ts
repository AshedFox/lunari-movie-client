'use server';

import { createSubscriptionsManageLink } from './server';

export async function createSubscriptionsManageLinkAction() {
  return createSubscriptionsManageLink();
}
