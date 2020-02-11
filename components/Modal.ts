interface Modal {
    open: boolean;
    title: string;
    message?: string
    primaryAction: Action;
    secondaryActions?: Action[];
    onClose: () => void;
}
