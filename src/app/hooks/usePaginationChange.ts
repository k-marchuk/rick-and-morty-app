import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function usePaginationChange() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  function handlePaginationChange(currentPage: number) {
    const updatedParams = new URLSearchParams(searchParameters.toString());
    updatedParams.set('page', currentPage.toString());
    router.push(pathname + '?' + updatedParams.toString());
  }

  return { handlePaginationChange };
}
