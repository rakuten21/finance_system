-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 13, 2024 at 11:10 AM
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
  `approval_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `final_reviewer` varchar(100) DEFAULT NULL,
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
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `chart_of_accounts`
--

INSERT INTO `chart_of_accounts` (`account_id`, `account_code`, `account_description`, `account_type`, `date_created`, `date_updated`) VALUES
(4, 101, 'Cash', 'Asset', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(5, 102, 'Accounts Receivable', 'Asset', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(6, 103, 'Inventory', 'Asset', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(7, 104, 'Prepaid Expenses', 'Asset', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(8, 105, 'Equipment', 'Asset', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(26, 106, 'Petty Cash', 'Asset', '2024-09-07 08:05:13', '2024-09-07 08:05:13'),
(9, 201, 'Accounts Payable', 'Liabilities', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(10, 202, 'Short-Term Loans', 'Liabilities', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(11, 203, 'Accrued Expenses', 'Liabilities', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(12, 204, 'Unearned Revenue', 'Liabilities', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(13, 205, 'Long-Term Debt', 'Liabilities', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(14, 301, 'Common Stock', 'Equity', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(15, 302, 'Retained Earnings', 'Equity', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(16, 303, 'Additional Paid-In Capital', 'Equity', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(17, 304, 'Treasury Stock', 'Equity', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(18, 401, 'Sales Revenue', 'Revenue', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(19, 402, 'Service Revenue', 'Revenue', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(20, 403, 'Interest Revenue', 'Revenue', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(21, 404, 'Dividend Income', 'Revenue', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(22, 501, 'Rent Expense', 'Expenses', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(23, 502, 'Salaries Expense', 'Expenses', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(24, 503, 'Utilities Expense', 'Expenses', '2024-08-29 18:50:56', '2024-08-29 18:50:56'),
(25, 504, 'Supplies Expense', 'Expenses', '2024-08-29 18:50:56', '2024-08-29 18:50:56');

-- --------------------------------------------------------

--
-- Table structure for table `journal_entries`
--

CREATE TABLE `journal_entries` (
  `journal_entry_id` int(11) NOT NULL,
  `journal_entry_number` varchar(50) NOT NULL,
  `je_date` date NOT NULL,
  `je_period` varchar(20) NOT NULL,
  `je_book` int(11) NOT NULL,
  `je_description` text NOT NULL,
  `status` enum('draft','posted','archived') DEFAULT 'draft',
  `date_created` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_updated` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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

-- --------------------------------------------------------

--
-- Table structure for table `list_of_books`
--

CREATE TABLE `list_of_books` (
  `book_id` int(11) NOT NULL,
  `book_name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `date_created` datetime NOT NULL DEFAULT current_timestamp(),
  `date_updated` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `start_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `list_of_books`
--

INSERT INTO `list_of_books` (`book_id`, `book_name`, `description`, `date_created`, `date_updated`, `start_date`) VALUES
(1, 'Cash Book', 'Records all cash transactions, including cash receipts and cash payments.', '2024-01-15 09:00:00', '2024-09-07 12:53:18', '2023-04-20'),
(2, 'Purchase Book', 'Records all purchases of goods and services on credit.', '2023-11-20 08:45:00', '2024-09-07 12:53:37', '2023-09-01'),
(3, 'Sales Book', 'Records all sales transactions, typically on credit.', '2022-07-05 14:00:00', '2024-09-07 12:53:59', '2021-03-21'),
(4, 'Purchase Return Book', 'Records returns of goods purchased on credit.', '2024-03-01 13:30:00', '2024-09-07 12:54:22', '2021-03-01'),
(5, 'Sales Return Book', 'Records returns of goods sold on credit.', '2023-09-10 11:15:00', '2024-09-07 12:54:33', '2022-01-02'),
(6, 'Petty Cash Book', 'Records small, incidental expenses paid in cash.', '2021-02-14 10:00:00', '2024-09-07 12:54:47', '2023-11-15'),
(8, 'Journal Book', 'Records all transactions that don\'t fit into other books.', '2024-09-05 14:44:00', '2024-09-07 12:55:08', '2022-09-09'),
(9, 'Accounts Payable Book', 'Records amounts the business owes to suppliers or creditors.', '2024-09-05 20:22:37', '2024-09-07 12:55:31', '2021-02-14'),
(10, 'Account Receivable 2024', 'Record amounts the business on credit on year 2024', '2024-09-07 16:04:00', '2024-09-07 16:04:42', '2024-09-07');

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
  ADD KEY `account_code` (`account_code`),
  ADD KEY `account_code_2` (`account_code`);

--
-- Indexes for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD PRIMARY KEY (`journal_entry_id`),
  ADD UNIQUE KEY `journal_entry_number` (`journal_entry_number`),
  ADD KEY `je_book` (`je_book`);

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
  MODIFY `account_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `journal_entries`
--
ALTER TABLE `journal_entries`
  MODIFY `journal_entry_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `journal_entry_lines`
--
ALTER TABLE `journal_entry_lines`
  MODIFY `journal_entry_line_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `list_of_books`
--
ALTER TABLE `list_of_books`
  MODIFY `book_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approval_and_authorship`
--
ALTER TABLE `approval_and_authorship`
  ADD CONSTRAINT `approval_and_authorship_ibfk_1` FOREIGN KEY (`journal_entry_id`) REFERENCES `journal_entries` (`journal_entry_id`) ON DELETE CASCADE;

--
-- Constraints for table `journal_entries`
--
ALTER TABLE `journal_entries`
  ADD CONSTRAINT `journal_entries_ibfk_1` FOREIGN KEY (`je_book`) REFERENCES `list_of_books` (`book_id`);

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
