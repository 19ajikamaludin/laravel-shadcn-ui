<?php

namespace App\Constants;

class PermissionConstant
{
    const LIST = [
        ['label' => 'View Dashboard', 'name' => 'view-dashboard', 'group' => 'General'],

        ['label' => 'Create User', 'name' => 'create-user', 'group' => 'User'],
        ['label' => 'Update User', 'name' => 'update-user', 'group' => 'User'],
        ['label' => 'View User', 'name' => 'view-user', 'group' => 'User'],
        ['label' => 'Delete User', 'name' => 'delete-user', 'group' => 'User'],

        ['label' => 'Create Role', 'name' => 'create-role', 'group' => 'User'],
        ['label' => 'Update Role', 'name' => 'update-role', 'group' => 'User'],
        ['label' => 'View Role', 'name' => 'view-role', 'group' => 'User'],
        ['label' => 'Delete Role', 'name' => 'delete-role', 'group' => 'User'],

        ['label' => 'View Setting', 'name' => 'view-setting', 'group' => 'General'],
        ['label' => 'Update Setting', 'name' => 'update-setting', 'group' => 'General'],
        // #Add New Permission Below!

        ['label' => 'View Backup/Restore', 'name' => 'view-backup-restore', 'group' => 'General'],

        ['label' => 'Create Penyesuaian', 'name' => 'create-stock-opname', 'group' => 'Stock'],
        ['label' => 'View Penyesuaian', 'name' => 'view-stock-opname', 'group' => 'Stock'],

        ['label' => 'Delete Stock Transfer', 'name' => 'delete-stock-transfer', 'group' => 'Stock'],
        ['label' => 'Update Stock Transfer', 'name' => 'update-stock-transfer', 'group' => 'Stock'],
        ['label' => 'Create Stock Transfer', 'name' => 'create-stock-transfer', 'group' => 'Stock'],
        ['label' => 'View Stock Transfer', 'name' => 'view-stock-transfer', 'group' => 'Stock'],

        ['label' => 'Create Pelunasan Piutang', 'name' => 'create-sale-payment', 'group' => 'Sale'],
        ['label' => 'View Pelunasan Piutang', 'name' => 'view-sale-payment', 'group' => 'Sale'],

        ['label' => 'Delete Return Penjualan', 'name' => 'delete-sale-return', 'group' => 'Sale'],
        ['label' => 'Update Return Penjualan', 'name' => 'update-sale-return', 'group' => 'Sale'],
        ['label' => 'Create Return Penjualan', 'name' => 'create-sale-return', 'group' => 'Sale'],
        ['label' => 'View Return Penjualan', 'name' => 'view-sale-return', 'group' => 'Sale'],

        ['label' => 'Create Pelunasan Hutang', 'name' => 'create-purchase-payment', 'group' => 'Purchase'],
        ['label' => 'View Pelunasan Hutang', 'name' => 'view-purchase-payment', 'group' => 'Purchase'],

        ['label' => 'Delete Return Pembelian', 'name' => 'delete-purchase-return', 'group' => 'Purchase'],
        ['label' => 'Update Return Pembelian', 'name' => 'update-purchase-return', 'group' => 'Purchase'],
        ['label' => 'Create Return Pembelian', 'name' => 'create-purchase-return', 'group' => 'Purchase'],
        ['label' => 'View Return Pembelian', 'name' => 'view-purchase-return', 'group' => 'Purchase'],

        ['label' => 'Multi Print Penjualan Barang', 'name' => 'multi-print-sale', 'group' => 'Sale'],
        ['label' => 'Edit Harga Penjualan Barang', 'name' => 'edit-price-sale', 'group' => 'Sale'],
        ['label' => 'Delete Penjualan Barang', 'name' => 'delete-sale', 'group' => 'Sale'],
        ['label' => 'Update Penjualan Barang', 'name' => 'update-sale', 'group' => 'Sale'],
        ['label' => 'Create Penjualan Barang', 'name' => 'create-sale', 'group' => 'Sale'],
        ['label' => 'View Penjualan Barang', 'name' => 'view-sale', 'group' => 'Sale'],

        ['label' => 'Multi Print Pembelian Barang', 'name' => 'multi-print-purchase', 'group' => 'Purchase'],
        ['label' => 'Delete Pembelian Barang', 'name' => 'delete-purchase', 'group' => 'Purchase'],
        ['label' => 'Update Pembelian Barang', 'name' => 'update-purchase', 'group' => 'Purchase'],
        ['label' => 'Create Pembelian Barang', 'name' => 'create-purchase', 'group' => 'Purchase'],
        ['label' => 'View Pembelian Barang', 'name' => 'view-purchase', 'group' => 'Purchase'],

        ['label' => 'View Laba-Rugi', 'name' => 'view-report-income-statement', 'group' => 'Report'],
        ['label' => 'View Laporan Pembelian Perstock', 'name' => 'view-report-purchase-item', 'group' => 'Report'],
        ['label' => 'View Laporan Penjualan Perstock', 'name' => 'view-report-sale-item', 'group' => 'Report'],
        ['label' => 'View Laporan Pembelian', 'name' => 'view-report-purchase', 'group' => 'Report'],
        ['label' => 'View Laporan Penjualan', 'name' => 'view-report-sale', 'group' => 'Report'],
        ['label' => 'View Kartu Stock', 'name' => 'view-product-stock-card', 'group' => 'Report'],
        ['label' => 'View Stock', 'name' => 'view-product-stock', 'group' => 'Report'],
        ['label' => 'View Report', 'name' => 'view-report', 'group' => 'Report'],

        ['label' => 'Update Status PO Pembelian', 'name' => 'update-status-purchase-order', 'group' => 'Purchase'],
        ['label' => 'Mark as Done PO Pembelian', 'name' => 'mark-as-done-purchase-order', 'group' => 'Purchase'],
        ['label' => 'Delete PO Pembelian', 'name' => 'delete-purchase-order', 'group' => 'Purchase'],
        ['label' => 'Update PO Pembelian', 'name' => 'update-purchase-order', 'group' => 'Purchase'],
        ['label' => 'Create PO Pembelian', 'name' => 'create-purchase-order', 'group' => 'Purchase'],
        ['label' => 'View PO Pembelian', 'name' => 'view-purchase-order', 'group' => 'Purchase'],

        ['label' => 'Delete Produk', 'name' => 'delete-product', 'group' => 'Product'],
        ['label' => 'Update Produk', 'name' => 'update-product', 'group' => 'Product'],
        ['label' => 'Create Produk', 'name' => 'create-product', 'group' => 'Product'],
        ['label' => 'View Produk', 'name' => 'view-product', 'group' => 'Product'],

        ['label' => 'Delete Merk', 'name' => 'delete-brand', 'group' => 'Product'],
        ['label' => 'Update Merk', 'name' => 'update-brand', 'group' => 'Product'],
        ['label' => 'Create Merk', 'name' => 'create-brand', 'group' => 'Product'],
        ['label' => 'View Merk', 'name' => 'view-brand', 'group' => 'Product'],

        ['label' => 'Delete Customer', 'name' => 'delete-customer', 'group' => 'Customer'],
        ['label' => 'Update Customer', 'name' => 'update-customer', 'group' => 'Customer'],
        ['label' => 'Create Customer', 'name' => 'create-customer', 'group' => 'Customer'],
        ['label' => 'View Customer', 'name' => 'view-customer', 'group' => 'Customer'],

        ['label' => 'Delete Supplier', 'name' => 'delete-supplier', 'group' => 'Supplier'],
        ['label' => 'Update Supplier', 'name' => 'update-supplier', 'group' => 'Supplier'],
        ['label' => 'Create Supplier', 'name' => 'create-supplier', 'group' => 'Supplier'],
        ['label' => 'View Supplier', 'name' => 'view-supplier', 'group' => 'Supplier'],

        ['label' => 'Memilih Gudang', 'name' => 'select-warehouse', 'group' => 'Stock'],
        ['label' => 'Delete Gudang', 'name' => 'delete-warehouse', 'group' => 'Stock'],
        ['label' => 'Update Gudang', 'name' => 'update-warehouse', 'group' => 'Stock'],
        ['label' => 'Create Gudang', 'name' => 'create-warehouse', 'group' => 'Stock'],
        ['label' => 'View Gudang', 'name' => 'view-warehouse', 'group' => 'Stock'],

        ['label' => 'Delete Golongan', 'name' => 'delete-product-category', 'group' => 'Product'],
        ['label' => 'Update Golongan', 'name' => 'update-product-category', 'group' => 'Product'],
        ['label' => 'Create Golongan', 'name' => 'create-product-category', 'group' => 'Product'],
        ['label' => 'View Golongan', 'name' => 'view-product-category', 'group' => 'Product'],

        ['label' => 'Delete Satuan', 'name' => 'delete-unit', 'group' => 'Product'],
        ['label' => 'Update Satuan', 'name' => 'update-unit', 'group' => 'Product'],
        ['label' => 'Create Satuan', 'name' => 'create-unit', 'group' => 'Product'],
        ['label' => 'View Satuan', 'name' => 'view-unit', 'group' => 'Product'],
    ];

    public static function all()
    {
        return array_merge(self::LIST);
    }
}
