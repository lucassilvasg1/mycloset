import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  async setObject(entity: any, ITEMS_KEY) {
    await this.storage.get(ITEMS_KEY).then(async (entitys: any) => {

      if (entitys) {
        let newanys: any = JSON.parse(entitys);
        newanys.push(entity);

        await this.storage.set(ITEMS_KEY, JSON.stringify(newanys));
      } else {
        await this.storage.set(ITEMS_KEY, JSON.stringify([entity]));
      }
    })
  }

  async getObject(ITEMS_KEY) {
    const ret: any = await this.storage.get(ITEMS_KEY);

    if (ret == null) return null;

    const entitys = JSON.parse(ret);

    return entitys;
  }

  async removeStorageValue(id: number, ITEMS_KEY) {
    const ret: any = await this.storage.get(ITEMS_KEY);
    const entitys = JSON.parse(ret);

    if (!entitys || entitys.length === 0) {
      return null;
    }

    let toKeep: any[] = [];

    for (let i of entitys) {
      if (i.id !== id) {
        toKeep.push(i);
      }
    }

    await this.storage.set(ITEMS_KEY, JSON.stringify(toKeep));

    return true;
  }

  async clear() {
    await this.storage.clear();
  }
}
