import {Pipe, PipeTransform} from '@angular/core';
import {Group} from "../entities/group";

@Pipe({
  name: 'groupsToString'
})
export class GroupsToStringPipe implements PipeTransform {

  transform(groups: Group[], properties: string): unknown {
    if (properties === 'permissions') {
      return groups.flatMap(value => value.permissions)
        .reduce((acc, perm) => acc.includes(perm) ? acc : [...acc, perm], []).join(', ');
    }
    return groups.map(value => value.name).join(', ');
  }
}
