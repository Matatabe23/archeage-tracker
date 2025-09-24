import { getMainInfo } from '@/shared';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: () => ({
        userData: null,
        auth: false,
        listRoles: [],
        permissionsRoles: []
    }),


    actions: {
        async getMainInfo() {
            const mainInfo = await getMainInfo()

            this.listRoles = mainInfo.listRoles
            this.permissionsRoles = mainInfo.data.PERMISSIONS
        }
    }
});
