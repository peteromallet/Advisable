import React from "react";
import { Box, Card, Skeleton, useBreakpoint } from "@advisable/donut";
import { StyledTable, StyledTitle } from "./styles";

function Loading() {
  const isWidescreen = useBreakpoint("sUp");
  return (
    <Box>
      <Box display="flex" mb="m" fontSize="s">
        <Skeleton width={61} height={15} mr="xs" />
        <Skeleton width={8} height={15} mr="xs" />
        <Skeleton width={126} height={15} />
      </Box>
      <Card p="24px">
        <Box display="flex" alignItems="flex-start" justifyContent="flex-end">
          <Box mr="auto" mb="l">
            <Skeleton width={140} height={20} mb="xxs" />
            <Skeleton width={120} height={19} />
          </Box>
          <Skeleton width={55} height={24} borderRadius={12} />
        </Box>
        <Box mb="36px">
          <Skeleton width={63} height={17} mb="xxs" />
          <Skeleton width={102} height={17} mb="xxs" />
          <Skeleton width={213} height={17} mb="xxs" />
        </Box>

        <Box mb="36px">
          <Skeleton width={38} height={17} mb="xxs" />
          <Skeleton width={122} height={17} mb="xxs" />
        </Box>

        <Box as={StyledTable} width="100%">
          {isWidescreen ? (
            <colgroup>
              <col span="1" style={{ width: "65%" }} />
              <col span="1" style={{ width: "20%" }} />
              <col span="1" style={{ width: "15%" }} />
            </colgroup>
          ) : (
            <colgroup>
              <col span="1" style={{ width: "90%" }} />
              <col span="1" style={{ width: "10%" }} />
            </colgroup>
          )}
          {isWidescreen && (
            <Box as="thead">
              <tr>
                <th>
                  <Skeleton width={32} height={15} />
                </th>
                <th>
                  <Skeleton width={71} height={15} ml="auto" />
                </th>
                <th>
                  <Skeleton width={62} height={15} ml="auto" />
                </th>
              </tr>
            </Box>
          )}
          <tbody>
            <StyledTitle>
              <th>
                <Skeleton width={[120, 220]} height={21} mb="2px" />
              </th>
              {isWidescreen && (
                <th>
                  <Skeleton width={67} height={21} mb="2px" ml="auto" />
                </th>
              )}
              <th>
                <Skeleton width={48} height={21} mb="2px" ml="auto" />
              </th>
            </StyledTitle>
          </tbody>
          <tfoot>
            <tr>
              {isWidescreen && <th />}
              <th>
                <Skeleton width={94} height={17} ml="auto" />
              </th>
              <th>
                <Skeleton width={45} height={17} ml="auto" />
              </th>
            </tr>
          </tfoot>
        </Box>
        <Box display="flex" flexDirection={["column", "row"]}>
          <Skeleton
            width={[1, 160]}
            height={42}
            borderRadius={21}
            mr={[0, "s"]}
            mb={["xs", 0]}
          />
          <Skeleton width={[1, 160]} height={42} borderRadius={21} />
        </Box>
      </Card>
    </Box>
  );
}

export default Loading;
