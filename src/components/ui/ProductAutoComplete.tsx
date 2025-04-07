import { IProduct } from "@/dataInterfaces/IProduct";
import api from "@/services/api";
import { Autocomplete, CircularProgress, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

function sleep(duration: number): Promise<void> {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }

export default function ProductAutoComplete() {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(false);

    const [products, setProducts] = useState<IProduct[]>([]);

    const handleOpen = () => {
        setOpen(true);
        (async () => {
            setLoading(true);
            await sleep(1e3); // For demo purposes.
            setLoading(false);
            setOptions(products);
        })();
    };
    
    const handleClose = () => {
        setOpen(false);
        setOptions([]);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try {
            const response = await api.get("/productSku", {
                params: {
                    page: 0,
                    size: 10
                }
            })
            setProducts(response.data.content);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Autocomplete
          sx={{ width: 300 }}
          open={open}
          onOpen={handleOpen}
          onClose={handleClose}
          isOptionEqualToValue={(option, value) => option.product.productName === value.product.productName}
          getOptionLabel={(option) => option.product.productName}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              className="text-white bg-white w-full"
              label="Buscar produtos"
              slotProps={{
                input: {
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                },
              }}
            />
          )}
        />
      );

}
