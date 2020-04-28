import React, {useState, useCallback, useMemo} from 'react';
import {Modal, ModalProps} from '@shopify/polaris';
import {ArgoHeader} from '../shared/Header';
import {ExtensionPoint, RenderExtensionComponentProps} from '@shopify/app-extensions-renderer';
import {retain} from '@shopify/remote-ui-core';

import {AppExtension} from '../../AppExtension';
import useModalActionsInput from './useModalActionInput';

interface ArgoModalProps {
  open: boolean;
  defaultTitle: string;
  onClose: () => void;
  onBackClick?: () => void;
  appInfo: {
    icon?: string;
    name: string;
  };
  height?: string;
}

type Props<T extends ExtensionPoint> = ArgoModalProps & RenderExtensionComponentProps<T>;

type Action = () => void;
const noop = () => null;

export function ArgoModal<T extends ExtensionPoint>({
  open,
  defaultTitle,
  appInfo,
  onClose,
  onBackClick,
  extensionPoint,
  script,
  components,
  input,
  height,
}: Props<T>) {
  const [primaryContent, setPrimaryContent] = useState('Save');
  const [primaryAction, setPrimaryAction] = useState<Action>(() => noop);
  const [secondaryContent, setSecondaryContent] = useState('');
  const [secondaryAction, setSecondaryAction] = useState<Action>(() => noop);

  const {name, icon} = appInfo;
  const onBackAction = useCallback(() => {
    onBackClick?.();
  }, [open, onBackClick]);

  const setPrimaryActionCallback = useCallback(
    (f: Action) => {
      setPrimaryAction(() => f);
      retain(f);
    },
    [primaryAction],
  );
  const onPrimaryAction = useCallback(() => {
    primaryAction();
  }, [primaryAction]);

  const setSecondaryActionCallback = useCallback(
    (f: Action) => {
      setSecondaryAction(() => f);
      retain(f);
    },
    [secondaryAction],
  );
  const onSecondaryAction = useCallback(() => {
    secondaryAction();
  }, [secondaryAction]);

  const onCloseAction = useCallback(() => {
    onClose();
  }, [open]);

  const modalActions = useModalActionsInput({
    setPrimaryContent,
    setPrimaryAction: setPrimaryActionCallback,
    setSecondaryContent,
    setSecondaryAction: setSecondaryActionCallback,
    closeModal: onCloseAction,
  });

  const modalProps: ModalProps = {
    primaryAction: {
      content: primaryContent,
      onAction: onPrimaryAction,
    },
    onClose: onCloseAction,
    open,
    title: (
      <ArgoHeader appName={name} appIcon={icon} title={defaultTitle} onBackAction={onBackAction} />
    ),
  };

  if (secondaryContent) {
    modalProps.secondaryActions = [
      {
        content: secondaryContent,
        onAction: onSecondaryAction,
      },
    ];
  }

  const inputWithModalActions = {...modalActions, ...input} as typeof input;

  return (
    <>
      <Modal {...modalProps}>
        <div
          className="ArgoModal-content"
          style={{
            height,
          }}
        >
          <AppExtension
            script={script}
            extensionPoint={extensionPoint}
            components={components}
            input={inputWithModalActions}
          />
        </div>
      </Modal>
    </>
  );
}