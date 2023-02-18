import { Button, Flex, FormControl, FormLabel, Grid, Input } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import Datatable from "../../components/data-table/DataTable";
import Layout from "../../components/layout.js/Layout";
import Loader from "../../components/loader/Loader";
import CustomSelect from "../../components/select/CustomSelect";
import Wrapper from "../../components/wrapper/Wrapper";
import { API } from "../../utils/axios/axiosConfig";
import { LEAD_LIST_API } from "../../utils/routes/URLs";
import { COLUMNS } from "./columns";

export default function Leads() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [sourceList, setSourceList] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [assigneeList, setAssigneeList] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(10);

  //filterState
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [selectedSource, setSelectedSource] = useState([]);
  const [selectedAssignees, setSelectedAssignees] = useState([]);
  const [selectedFrom, setSelectedFrom] = useState("");
  const [selectedTo, setSelectedTo] = useState("");

  const columns = useMemo(() => COLUMNS, []);

  const payload = {
    search: isFiltered ? "search value" : "",
    lead_status_id: selectedStatus?.map((d) => d?.value),
    source_id: selectedSource?.map((d) => d?.value),
    user_id: selectedAssignees?.map((d) => d?.value),
    contacted_date_from: selectedFrom,
    contacted_date_to: selectedTo,
  };

  const getLeadList = (page) => {
    setLoading(true);
    API.post(LEAD_LIST_API(page), payload)
      .then((res) => {
        if (res?.data?.code === 200) {
          setData(res?.data?.data?.data);
          setTotalRows(res?.data?.data?.total);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (page) => {
    getLeadList(page);
  };

  const handlePerRowsChange = (newPerPage, page) => {
    API.post(`/api/admin/lead/list?page=${page}&limit=${newPerPage}`, payload)
      .then((res) => {
        if (res?.data?.code === 200) {
          setPerPage(newPerPage);
          setData(res?.data?.data?.data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setLoading(false);
      });
  };

  // Fetch Filter APIs
  const fetchStatus = async () => {
    setLoading(true);
    try {
      let res = await API.get("/api/admin/base/lead-status");
      if (res?.data?.code === 200) {
        let temp = res?.data?.data?.map((d) => ({ label: d?.name, value: d?.id }));
        setStatusList(temp);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSource = async () => {
    setLoading(true);
    try {
      let res = await API.get("/api/admin/base/source");
      if (res?.data?.code === 200) {
        let temp = res?.data?.data?.map((d) => ({ label: d?.name, value: d?.id }));
        setSourceList(temp);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignee = async () => {
    setLoading(true);
    try {
      let res = await API.get("/api/admin/base/assignee");
      if (res?.data?.code === 200) {
        let temp = res?.data?.data?.map((d) => ({ label: d?.name, value: d?.id }));
        setAssigneeList(temp);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLeadList(1);
    fetchStatus();
    fetchSource();
    fetchAssignee();
  }, []);

  const Filter = () => {
    return (
      <Grid templateColumns={"repeat(6, 1fr)"} gap={2} mb="2">
        <CustomSelect
          isMulti
          options={statusList}
          placeholder={"Status"}
          onChange={(e) => {
            setSelectedStatus(e);
          }}
          value={selectedStatus}
        />
        <CustomSelect
          isMulti
          options={sourceList}
          placeholder={"Sources"}
          onChange={(e) => {
            setSelectedSource(e);
          }}
          value={selectedSource}
        />
        <CustomSelect
          isMulti
          options={assigneeList}
          placeholder={"Assignees"}
          onChange={(e) => {
            setSelectedAssignees(e);
          }}
          value={selectedAssignees}
        />

        <Input
          size="sm"
          type="date"
          onChange={(e) => {
            setSelectedFrom(e.target.value);
          }}
          value={selectedFrom}
        />
        <Input
          size="sm"
          type="date"
          onChange={(e) => {
            setSelectedTo(e.target.value);
          }}
          value={selectedTo}
        />
        <Flex gap={2}>
          <Button
            size="sm"
            colorScheme="blue"
            onClick={() => {
              setIsFiltered(true);
              getLeadList(1);
            }}
          >
            Filter
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsFiltered(false);
              setSelectedStatus([]);
              setSelectedSource([]);
              setSelectedAssignees([]);
              setSelectedFrom("");
              setSelectedTo("");
              getLeadList(1);
            }}
          >
            Reset Filter
          </Button>
        </Flex>
      </Grid>
    );
  };

  const resetFilter = () => {
    setIsFiltered(false);
    setSelectedStatus([]);
    setSelectedSource([]);
    setSelectedAssignees([]);
    setSelectedFrom("");
    setSelectedTo("");
    getLeadList(1);
  };

  return (
    <Layout>
      {loading && <Loader />}
      <Wrapper>
        <Filter />
        <Datatable
          data={data}
          columns={columns}
          selectableRows
          paginationServer
          paginationTotalRows={totalRows}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handlePerRowsChange}
          paginationRowsPerPageOptions={[10, 20, 50]}
        />
      </Wrapper>
    </Layout>
  );
}
