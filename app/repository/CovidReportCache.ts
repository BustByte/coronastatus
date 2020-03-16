export class CacheWithLifetime<T> {
  private cachedElements?: T;
  private cacheLifetimeInMinutes: number;

  constructor(cacheLifetimeInMinutes = 1) {
    this.cacheLifetimeInMinutes = cacheLifetimeInMinutes;
  }

  async getCachedElements(fetchNewElements: () => Promise<T>): Promise<T> {
    if (!this.cachedElements) {
      this.cachedElements = await fetchNewElements();
      this.scheduleCacheInvalidation();
    }
    return this.cachedElements;
  }

  private scheduleCacheInvalidation(): void {
    const millis = this.cacheLifetimeInMinutes * 1000 * 60;
    setTimeout(() => {
      this.cachedElements = undefined;
    }, millis);
  }
}
