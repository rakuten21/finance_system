-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2024 at 02:54 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `finance_management_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `approval_and_authorship`
--

CREATE TABLE `approval_and_authorship` (
  `approval_authorship_id` int(11) NOT NULL,
  `journal_entry_id` int(11) NOT NULL,
  `entered_by` varchar(100) NOT NULL,
  `entered_date` date NOT NULL,
  `approved_by` varchar(100) DEFAULT NULL,
  `approved_date` date DEFAULT NULL,
  `approval_status` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `chart_of_accounts`
--

CREATE TABLE `chart_of_accounts` (
  `account_id` int(11) NOT NULL,
  `account_code` int(11) NOT NULL,
  `account_description` varchar(100) NOT NULL,
  `account_type` enum('Asset','Liabilities','Equity','Revenue','Expenses') NOT NULL,
  `account_status` enum('Active','Archived') NOT NULL DEFAULT 'Active',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chart_of_accounts`
--

INSERT INTO `chart_of_accounts` (`account_id`, `account_code`, `account_description`, `account_type`, `account_status`, `date_created`, `date_updated`) VALUES
(4, 101, 'Cash', 'Asset', 'Active', '2024-08-29 18:50:56', '2024-10-06 03:34:05'),
(5, 102, 'Accounts Receivable', 'Asset', 'Active', '2024-08-29 18:50:56', '2024-10-06 03:33:49'),
(6, 103, 'Inventory', 'Asset', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(7, 104, 'Prepaid Expenses', 'Asset', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(8, 105, 'Equipment', 'Asset', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(26, 106, 'Petty Cash', 'Asset', 'Active', '2024-09-07 08:05:13', '2024-09-07 08:05:13'),
(29, 107, 'Daily Sales', 'Asset', 'Active', '2024-10-08 00:45:28', '2024-10-08 00:46:18'),
(9, 201, 'Accounts Payable', 'Liabilities', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(10, 202, 'Short-Term Loans', 'Liabilities', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(11, 203, 'Accrued Expenses', 'Liabilities', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(12, 204, 'Unearned Revenue', 'Liabilities', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(13, 205, 'Long-Term Debt', 'Liabilities', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(14, 301, 'Common Stock', 'Equity', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(15, 302, 'Retained Earnings', 'Equity', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(16, 303, 'Additional Paid-In Capital', 'Equity', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(17, 304, 'Treasury Stock', 'Equity', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(18, 401, 'Sales Revenue', 'Revenue', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(19, 402, 'Service Revenue', 'Revenue', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(20, 403, 'Interest Revenue', 'Revenue', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(21, 404, 'Dividend Income', 'Revenue', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(22, 501, 'Rent Expense', 'Expenses', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(23, 502, 'Salaries Expense', 'Expenses', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(24, 503, 'Utilities Expense', 'Expenses', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(25, 504, 'Supplies Expense', 'Expenses', 'Active', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(28, 1000, 'test2', 'Asset', 'Active', '2024-09-20 18:03:33', '2024-09-20 18:03:33'),
(27, 10101, 'test', 'Asset', 'Active', '2024-09-19 04:15:21', '2024-09-19 04:15:21');

-- --------------------------------------------------------

--
-- Table structure for table `journal_entries`
--

CREATE TABLE `journal_entries` (
  `journal_entry_id` int(11) NOT NULL,
  `journal_entry_number` varchar(50) NOT NULL,
  `je_date` date NOT NULL,
  `je_period` varchar(20) NOT NULL,
  `book_id` int(11) NOT NULL,
  `je_description` text NOT NULL,
  `status` enum('draft','posted','archived') NOT NULL DEFAULT 'draft',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journal_entries`
--

INSERT INTO `journal_entries` (`journal_entry_id`, `journal_entry_number`, `je_date`, `je_period`, `book_id`, `je_description`, `status`, `date_created`, `date_updated`) VALUES
(5, 'JE-001', '2024-09-18', '2024-09', 1, 'test', 'draft', '2024-09-17 19:12:54', '2024-09-17 19:12:54'),
(6, 'JE-002', '2024-09-21', '2024-09', 3, 'testest', 'draft', '2024-09-20 17:56:42', '2024-09-20 17:56:42'),
(7, 'JE-003', '2024-10-05', '2024-10', 1, 'test2', 'draft', '2024-10-04 21:49:44', '2024-10-04 21:49:44'),
(8, 'JE-004', '2024-10-07', '2024-10', 5, 'THIS IS A TEST', 'draft', '2024-10-07 10:13:45', '2024-10-07 10:13:45'),
(9, 'JE-005', '2024-10-08', '2024-08', 14, 'Daily Sales of the Store Passenger Seat', 'draft', '2024-10-08 00:49:11', '2024-10-08 00:49:11');

-- --------------------------------------------------------

--
-- Table structure for table `journal_entry_lines`
--

CREATE TABLE `journal_entry_lines` (
  `journal_entry_line_id` int(11) NOT NULL,
  `journal_entry_id` int(11) NOT NULL,
  `account_code` int(11) NOT NULL,
  `account_description` varchar(100) NOT NULL,
  `debit_amount` decimal(15,2) DEFAULT 0.00,
  `credit_amount` decimal(15,2) DEFAULT 0.00,
  `particulars` text DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `journal_entry_lines`
--

INSERT INTO `journal_entry_lines` (`journal_entry_line_id`, `journal_entry_id`, `account_code`, `account_description`, `debit_amount`, `credit_amount`, `particulars`, `date_created`, `date_updated`) VALUES
(1, 5, 101, '101', 12000.21, 0.00, 'test1', '2024-09-17 19:12:54', '2024-09-17 19:12:54'),
(2, 5, 205, '205', 0.00, 12000.21, 'test2', '2024-09-17 19:12:54', '2024-09-17 19:12:54'),
(3, 6, 201, '201', 0.00, 89000.00, 'testest1', '2024-09-20 17:56:42', '2024-09-20 17:56:42'),
(4, 6, 204, '204', 35466.00, 0.00, 'testest2', '2024-09-20 17:56:42', '2024-09-20 17:56:42'),
(5, 6, 303, '303', 32222.00, 0.00, 'testest3', '2024-09-20 17:56:42', '2024-09-20 17:56:42'),
(6, 6, 102, '102', 21312.00, 0.00, 'testest4', '2024-09-20 17:56:42', '2024-09-20 17:56:42'),
(7, 7, 102, '102', 2000.00, 0.00, 'test2', '2024-10-04 21:49:44', '2024-10-04 21:49:44'),
(8, 7, 301, '301', 0.00, 2000.00, 'test3', '2024-10-04 21:49:44', '2024-10-04 21:49:44'),
(9, 8, 205, '205', 0.00, 4519.50, '1ST', '2024-10-07 10:13:45', '2024-10-07 10:13:45'),
(10, 8, 203, '203', 0.00, 63901.00, '2ND', '2024-10-07 10:13:45', '2024-10-07 10:13:45'),
(11, 8, 103, '103', 23882.00, 0.00, '3RD', '2024-10-07 10:13:45', '2024-10-07 10:13:45'),
(12, 8, 101, '101', 32628.00, 0.00, '4TH', '2024-10-07 10:13:45', '2024-10-07 10:13:45'),
(13, 8, 106, '106', 11910.50, 0.00, '5TH', '2024-10-07 10:13:45', '2024-10-07 10:13:45'),
(14, 9, 101, '101', 3200.00, 0.00, 'The cash for the daily operation of the store', '2024-10-08 00:49:11', '2024-10-08 00:49:11'),
(15, 9, 401, '401', 0.00, 3200.00, 'Sales Revenue of the store', '2024-10-08 00:49:11', '2024-10-08 00:49:11');

-- --------------------------------------------------------

--
-- Table structure for table `list_of_books`
--

CREATE TABLE `list_of_books` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(100) NOT NULL,
  `book_type` enum('Purchasing and Sales','Cash Transactions','Credit Transactions','General Transactions','Specialized Books','Accounts Receivable','Accounts Payable') NOT NULL,
  `book_status` enum('Active','Archived') NOT NULL DEFAULT 'Active',
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_of_books`
--

INSERT INTO `list_of_books` (`book_id`, `book_name`, `book_type`, `book_status`, `date_created`, `date_updated`) VALUES
(1, 'Cash Book', 'Purchasing and Sales', 'Active', '2024-01-15 09:00:00', '2024-10-06 12:58:09'),
(2, 'Purchase Book', 'Purchasing and Sales', 'Active', '2023-11-20 08:45:00', '2024-09-07 12:53:37'),
(3, 'Sales Book', 'Purchasing and Sales', 'Active', '2022-07-05 14:00:00', '2024-09-07 12:53:59'),
(4, 'Purchase Return Book', 'Purchasing and Sales', 'Active', '2024-03-01 13:30:00', '2024-09-07 12:54:22'),
(5, 'Sales Return Book', 'Purchasing and Sales', 'Active', '2023-09-10 11:15:00', '2024-09-07 12:54:33'),
(6, 'Petty Cash Book', 'Purchasing and Sales', 'Active', '2021-02-14 10:00:00', '2024-09-07 12:54:47'),
(8, 'Journal Book', 'Purchasing and Sales', 'Active', '2024-09-05 14:44:00', '2024-09-07 12:55:08'),
(9, 'Accounts Payable Book', 'Purchasing and Sales', 'Active', '2024-09-05 20:22:37', '2024-09-07 12:55:31'),
(10, 'Account Receivable 2024', 'Purchasing and Sales', 'Archived', '2024-09-07 16:04:00', '2024-10-06 13:01:27'),
(11, 'Accounts Payable 2024', 'Purchasing and Sales', 'Active', '2024-09-21 01:55:01', '2024-10-06 12:20:53'),
(12, 'test', 'Purchasing and Sales', 'Active', '2024-10-06 13:35:34', '2024-10-06 13:35:34'),
(13, 'test3', 'Accounts Payable', 'Active', '2024-10-06 13:35:50', '2024-10-06 13:45:47'),
(14, 'Daily Sales Book', 'Cash Transactions', 'Active', '2024-10-08 08:46:40', '2024-10-08 08:47:14');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `approval_and_authorship`
--
ALTER TABLE `approval_and_authorship`
  ADD PRIMARY KEY (`approval_authorship_id`),
  ADD KEY `journal_entry_id` (`journal_entry_id`);

--
-- Indexes for table `chart_of_accounts`
--
ALTER TABLE `chart_of_accounts`
  ADD PRIMARY KEY (`account_code`),
  ADD UNIQUE KEY `id` (`account_id`),
  ADD KEY `account_code` (`account_code`);

--
-- Indexes for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD PRIMARY KEY (`journal_entry_id`),
  ADD UNIQUE KEY `journal_entry_number` (`journal_entry_number`),
  ADD KEY `je_book` (`book_id`);

--
-- Indexes for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  ADD PRIMARY KEY (`journal_entry_line_id`),
  ADD KEY `journal_entry_id` (`journal_entry_id`),
  ADD KEY `account_code` (`account_code`);

--
-- Indexes for table `list_of_books`
--
ALTER TABLE `list_of_books`
  ADD PRIMARY KEY (`book_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `approval_and_authorship`
--
ALTER TABLE `approval_and_authorship`
  MODIFY `approval_authorship_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `chart_of_accounts`
--
ALTER TABLE `chart_of_accounts`
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `journal_entries`
--
ALTER TABLE `journal_entries`
  MODIFY `journal_entry_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  MODIFY `journal_entry_line_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `list_of_books`
--
ALTER TABLE `list_of_books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approval_and_authorship`
--
ALTER TABLE `approval_and_authorship`
  ADD CONSTRAINT `approval_and_authorship_ibfk_1` FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries` (`journal_entry_id`);

--
-- Constraints for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD CONSTRAINT `journal_entries_ibfk_1` FOREIGN KEY (`book_id`) REFERENCES `list_of_books` (`book_id`);

--
-- Constraints for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  ADD CONSTRAINT `journal_entry_lines_ibfk_1` FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries` (`journal_entry_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `journal_entry_lines_ibfk_2` FOREIGN KEY (`account_code`) REFERENCES `chart_of_accounts` (`account_code`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
