type Breadcrumb = string | (Partial<LinkProps> & { title: string; disabled: boolean })

interface LinkProps {
  href?: string | undefined;
  replace?: boolean | undefined;
  to?: string | undefined;
  exact?: boolean | undefined;
}

export const useBreadcrumbs = () => {
  const breadcrumbs = useState<Breadcrumb[]>('JDPBreadcrumbs', () => []);

  const setBreadcrumbs = (newBreadcrumbs: Breadcrumb[]) => {
    breadcrumbs.value = newBreadcrumbs;
  }

  return {
    breadcrumbs,
    setBreadcrumbs,
  }
}
