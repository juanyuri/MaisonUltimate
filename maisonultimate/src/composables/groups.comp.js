import { ref } from 'vue'
import groups_data from '@/data/groups2.json'
import Group from '@/interfaces/Group.js'

/**
 * Returns a reactive reference to an array of all groups.
 *
 * @returns {Ref<Array>} A reactive reference to an array of all groups.
 */
export const useGroups = () => {
    const groups = []

    for (let group_data of Object.values(groups_data)) {
        const {
            name, sets_in_group, trainers_using_group
        } = group_data

        const group = new Group(
            name, sets_in_group
        )
        groups.push(group)
      }

    return ref(groups)
}

/**
 * Returns an array of the names of all groups.
 *
 * @returns {Array<string>} An array of the names of all groups.
 */
export const getGroupsNames = () => {
    const groupsNames = []

    for (let group_data of groups_data) {
        groupsNames.push(group_data['name'])
    }

    return groupsNames
}