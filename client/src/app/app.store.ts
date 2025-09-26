import { getMainInfo } from '@/shared';
import { IAppStore } from '@/shared/types/appTypes';
import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
    state: (): IAppStore => ({
        userData: null,
        auth: false,
        listRoles: [],

        statics: null,
        enums: null,
    }),


    actions: {
        async getMainInfo() {
            const mainInfo = await getMainInfo()

            this.listRoles = mainInfo.listRoles
            this.statics = mainInfo.statics
            this.enums = mainInfo.enums

        },

        checkPermissions(permissions: string | string[], all: boolean = false): boolean {
            const rolePermissions = this.listRoles.find(
                (item) => item.name === this.userData.role
            );

            const userPerms = rolePermissions?.permissions ?? [];

            console.log(userPerms)

            if (Array.isArray(permissions)) {
                return all
                    ? permissions.every((perm) => userPerms.includes(perm)) // проверка всех
                    : permissions.some((perm) => userPerms.includes(perm)); // хотя бы одного
            }

            return userPerms.includes(permissions);
        }
    }
});
