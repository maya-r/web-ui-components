import { CreateVmWizard } from '../CreateVmWizard';
import { networkConfigs } from '../../../../tests/mocks/networkAttachmentDefinition';
import { baseTemplates } from '../../../../k8s/objects/template';
import { userTemplates } from '../../../../tests/mocks/user_template';
import { persistentVolumeClaims } from '../../../../tests/mocks/persistentVolumeClaim';
import { urlTemplateDataVolume } from '../../../../tests/mocks/user_template/url.mock';
import { callerContext } from '../../../../tests/k8s';

const templates = [...baseTemplates, ...userTemplates];

export const namespaces = [
  {
    metadata: {
      name: 'default',
    },
  },
  {
    metadata: {
      name: 'myproject',
    },
  },
];

export const storageClasses = [
  {
    metadata: {
      name: 'nfs',
      namespace: 'default',
    },
  },
  {
    metadata: {
      name: 'iscsi',
      namespace: 'default',
    },
  },
  {
    metadata: {
      name: 'glusterfs',
      namespace: 'default',
    },
  },
  {
    metadata: {
      name: 'azuredisk',
      namespace: 'default',
    },
  },
];

export const units = {
  dehumanize: val => ({ value: val ? val.match(/^[0-9]+/)[0] * 1073741824 : 0 }),
  humanize: () => {
    // mock implementation
    const unit = 'Gi';
    const value = 1234;
    return {
      string: `${value} ${unit}`,
      value,
      unit,
    };
  },
};

export default [
  {
    component: CreateVmWizard,
    name: 'namespaces',
    props: {
      ...callerContext,
      onHide: () => {},
      templates,
      templatesLoaded: true,
      namespaces,
      networkConfigs,
      persistentVolumeClaims,
      storageClasses,
      units,
      dataVolumes: [urlTemplateDataVolume],
      virtualMachines: [],
    },
  },
  {
    component: CreateVmWizard,
    name: 'selected namespace',
    props: {
      ...callerContext,
      onHide: () => {},
      templates,
      templatesLoaded: true,
      namespaces,
      selectedNamespace: namespaces[1],
      networkConfigs,
      persistentVolumeClaims,
      storageClasses,
      units,
      dataVolumes: [urlTemplateDataVolume],
      virtualMachines: [],
    },
  },
  {
    component: CreateVmWizard,
    name: 'loading',
    props: {
      ...callerContext,
      onHide: () => {},
      templates: null,
      templatesLoaded: false,
      namespaces: null,
      networkConfigs: null,
      persistentVolumeClaims: null,
      storageClasses: null,
      units,
      dataVolumes: null,
      virtualMachines: null,
    },
  },
  {
    component: CreateVmWizard,
    name: 'Create Vm Template',
    props: {
      ...callerContext,
      onHide: () => {},
      templates,
      templatesLoaded: true,
      namespaces,
      networkConfigs,
      persistentVolumeClaims,
      storageClasses,
      units,
      createTemplate: true,
      dataVolumes: [urlTemplateDataVolume],
      virtualMachines: [],
    },
  },
];
