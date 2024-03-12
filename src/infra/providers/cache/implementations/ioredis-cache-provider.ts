import { redisConnection } from "~/infra/redis/connection";

import { CacheProvider } from "../cache-provider";

export class RedisCacheProvider implements CacheProvider {
  public async save<SaveDataType>(
    key: string,
    value: SaveDataType
  ): Promise<void> {
    await redisConnection.set(key, JSON.stringify(value));
  }

  public async getByKey<SavedDataType>(
    key: string
  ): Promise<SavedDataType | null> {
    const data = await redisConnection.get(key);

    if (!data) return null;

    return JSON.parse(data) as SavedDataType;
  }

  public async invalidate(key: string): Promise<void> {
    await redisConnection.del(key);
  }
}
