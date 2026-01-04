import { Image, ImageProps } from "expo-image";
import { Skeleton } from "moti/skeleton";
import React, { useState } from "react";
import { View } from "react-native";

const LoadableImage = (props: ImageProps) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  return (
    <View style={props.style}>
      <Skeleton show={isLoading || isError} width={"100%"}>
        <Image
          {...props}
          style={{ width: "100%", height: "100%" }}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          onError={() => {
            setError(true);
          }}
          onLoad={() => {
            setLoading(false);
            setError(false);
          }}
        />
      </Skeleton>
    </View>
  );
};

export default LoadableImage;
