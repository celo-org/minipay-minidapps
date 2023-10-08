/// <reference types="react-scripts" />

declare global {
    interface Window {
        ethereum?: ExternalProvider;
    }
}

export {};
