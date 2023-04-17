import { UNITS_OF_MEASUREMENT } from "../data";

// calculate total volume per item with common base unit of measurement from collection
export default function calculateTotalVolume(product, baseUnit) {
  const unitsOfMeasurement = product.unitsOfMeasurement ?? baseUnit;
  const productUnits = product.units ?? 1;
  const convertedUnitsOfMeasurement = UNITS_OF_MEASUREMENT[baseUnit][unitsOfMeasurement] ?? 1;
  return convertedUnitsOfMeasurement * productUnits * product.volume;
}
