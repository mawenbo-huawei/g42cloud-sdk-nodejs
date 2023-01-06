import { Region } from "@g42cloud/g42cloud-sdk-core/region/region";

export class VpcRegion {
    public static AE_AD_1 = new Region("ae-ad-1", "https://vpc.ae-ad-1.g42cloud.com");
    

    private static STATIC_FIELDS = VpcRegion.createStaticFields();
    private static createStaticFields() {
        let map = new Map<String, Region>();
        map.set("ae-ad-1", VpcRegion.AE_AD_1);
        return map;
    }
    public static valueOf(regionId: String) {
        if (!regionId) {
          throw new Error("Unexpected empty parameter: regionId.");
        }
        const result = this.STATIC_FIELDS.get(regionId);
        if (result) {
          return result;
        }
        throw new Error(`Unexpected regionId: ${regionId}.`)
    }
}
