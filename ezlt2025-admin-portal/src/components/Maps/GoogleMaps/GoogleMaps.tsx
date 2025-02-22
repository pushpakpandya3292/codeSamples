//@ts-nocheck
/* eslint-disable no-use-before-define */
/* eslint-disable */
import React, { useState, Fragment, ReactNode, useEffect } from "react";
import { Box } from "@mui/material";
import {
  GoogleMap,
  Autocomplete,
  Marker,
  useLoadScript,
} from "@react-google-maps/api";
import type { LoadScriptProps } from "@react-google-maps/api";
import CustomTextField from "@/components/CustomTextField/CustomTextField";

interface IGoogleMapsProps {
  children: ReactNode;
  className?: string;
}

interface IAutoCompleteProps {
  onAddressChange: Function;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  name: string;
  className?: string;
  placeholder?: string;
  isValid?: boolean;
  isInvalid?: boolean;
  defaultValue?: IAddress;
  values?: any;
  setFieldValue?: any;
  onChange?: (value: any) => void;
  disabled?: boolean;
  label?: string;
}

interface IAddress {
  lat: number;
  lng: number;
  name: string | undefined;
  detail?: any;
  streetNumber?: string;
  route?: string;
  locality?: string;
  administrativeAreaLevelOne?: string;
  administrativeAreaLevelTwo?: string;
  postalCode?: string;
  neighborhood?: string;
  postalCodeSuffix?: string;
}

interface IMapProps {
  address: IAddress;
}

const containerStyle = {
  height: "100%",
  width: "100%",
  borderRadius: "8px",
};

const libraries: LoadScriptProps["libraries"] = ["places"];

const DEFAULT_GOOGLE_MAP_CENTER = {
  lat: 39.65284758224785,
  lng: -100.17592291870181,
};

const GoogleMaps: React.FC<IGoogleMapsProps> & {
  AutoComplete: React.FC<IAutoCompleteProps>;
  Map: React.FC<IMapProps>;
} = (props) => {
  const { isLoaded } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
    libraries,
  });
  return (
    <Fragment>
      <div style={{ width: "100%" }} className={props.className ?? ""}>
        {isLoaded && props.children}
      </div>
    </Fragment>
  );
};

GoogleMaps.AutoComplete = (props) => {
  const {
    onAddressChange = () => { },
    disabled,
    label,
    defaultValue,
    placeholder,
    ...rest
  } = props;

  const [searchResult, setSearchResult] =
    useState<google.maps.places.Autocomplete>();
  //@ts-ignore
  const [address, setAddress] = useState<IAddress | null>({
    ...props.defaultValue,
  });
  // useEffect(() => {
  //   if (props.defaultValue) {
  //     onAddressChange(props.defaultValue);
  //   }
  // }, [props.defaultValue]);

  const onLoad = (autocomplete: any) => {
    setSearchResult(autocomplete);
  };

  const onPlaceChanged = () => {
    if (searchResult) {
      const place: any = searchResult.getPlace();
      if (place.name) {
        let streetNumber = "";
        let route = "";
        let locality = "";
        let administrativeAreaLevelOne = "";
        let administrativeAreaLevelTwo = "";
        let postalCode = "";
        let postalCodeSuffix = "";
        let neighborhood = "";
        for (const component of place.address_components as google.maps.GeocoderAddressComponent[]) {
          const componentType = component.types[0];
          switch (componentType) {
            case "street_number": {
              streetNumber = component.long_name;
              break;
            }
            case "route": {
              route = component.long_name;
              break;
            }
            case "neighborhood": {
              neighborhood = component.long_name;
              break;
            }

            case "postal_code": {
              postalCode = component.long_name;
              break;
            }
            case "postal_code_suffix": {
              postalCodeSuffix = component.long_name;
              break;
            }
            case "locality":
              locality = component.long_name;
              break;

            case "administrative_area_level_1": {
              administrativeAreaLevelOne = component.short_name;
              break;
            }
            case "administrative_area_level_2": {
              administrativeAreaLevelTwo = component.long_name;
              break;
            }
          }
        }

        const formattedAddress = place.formatted_address;
        onAddressChange({
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          name: formattedAddress,
          detail: place,
          postalCode: postalCode,
          streetNumber,
          route,
          locality,
          administrativeAreaLevelOne,
          administrativeAreaLevelTwo,
          postalCodeSuffix: postalCodeSuffix,
        });
      } else {
        onAddressChange(null);
      }
    }
  };
  return (
    <Box sx={{ width: "100%", "& .MuiInputBase-root": { height: "40px" } }}>
      <Autocomplete onPlaceChanged={onPlaceChanged} onLoad={onLoad}>
        <CustomTextField
          type="text"
          // {...rest}
          InputLabelProps={{
            shrink: true,
          }}
          label={label}
          defaultValue={props.defaultValue?.detail?.formatted_address}
          onChange={(e) => {
            if (!e.target.value) {
              address && setAddress({ ...address, name: undefined });
              onAddressChange(null);
            }
          }}
          disabled={disabled}
        // placeholder={placeholder}
        />
      </Autocomplete>
    </Box>
  );
};

GoogleMaps.Map = ({ address }) => {
  const { isLoaded, loadError } = useLoadScript({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
    libraries,
  });

  if (loadError) {
    return <div>Map cannot be loaded right now, sorry.</div>;
  }

  return (
    <Fragment>
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={16}
          center={address ?? DEFAULT_GOOGLE_MAP_CENTER}
        >
          <Marker position={address ?? DEFAULT_GOOGLE_MAP_CENTER} />
        </GoogleMap>
      ) : (
        <Fragment>Loading...</Fragment>
      )}
    </Fragment>
  );
};

export default GoogleMaps;
