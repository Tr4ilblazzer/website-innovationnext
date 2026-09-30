import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

const stats = [
  { value: '50+', label: 'Dashboards deployed' },
  { value: 'Power BI', label: 'Primary reporting layer' },
  { value: 'API', label: 'Dashboard and scheduled-report delivery' },
  { value: 'Live', label: 'Capital-market reporting, Nepal' },
]

const features = [
  { title: 'Capital Markets BI', desc: 'Live data reporting for capital-market institutions in Nepal — customisable KPI frameworks, multi-source ingestion from trading systems, depositories, and market feeds, and regulator-aligned reporting.' },
  { title: 'Power BI & Reporting', desc: 'Executive, operational, and compliance dashboards — governed data models, row-level security, scheduled refresh, and embedded reporting for client portals.' },
  { title: 'Data Engineering & Pipelines', desc: 'Batch and streaming ingestion, ETL / ELT pipelines, data lakes, quality rules, and lineage — from source system to insight.' },
  { title: 'Data Warehousing', desc: 'Cloud and on-premise warehouse design and build, dimensional modelling, legacy data migration, and performance tuning.' },
  { title: 'Big Data & Advanced Analytics', desc: 'High-volume processing, real-time streaming, predictive analytics, customer analytics, and geospatial analysis.' },
  { title: 'Master Data Management', desc: 'A governed single view of customers, products, and accounts — with duplicate detection, golden records, and data governance.' },
]

const capabilities = [
  'Power BI (Tableau on request)',
  'Snowflake / Azure Synapse / BigQuery',
  'PostgreSQL / SQL Server warehouses',
  'Apache Spark / Airflow / dbt',
  'Kafka / Flink streaming',
  'API-based data delivery (REST, GraphQL, OData)',
  'Row-level security and column masking',
  'Core banking, payment, and ERP connectors',
  'Regulatory reporting outputs',
  'Data lineage and audit logs',
  'Predictive models in the BI layer',
  'Delivered alongside AI and Managed Services',
]

export default function BiDataSolutionPage() {
  return (
    <SolutionPageTemplate
      tag="BI & Data Solutions"
      headline="Data infrastructure built"
      headlineAccent="from live operations."
      quote="Data expertise earned from running fintech platforms at national scale."
      description="We deliver business intelligence, data engineering, and analytics platforms for financial institutions, capital-market entities, government, and enterprises — with 50+ dashboards deployed and live reporting for capital-market clients in Nepal."
      heroImage="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80"
      heroImageAlt="Business intelligence and data"
      stats={stats}
      featuresSubheadline="Delivered against live financial-services and government data — the same discipline we apply to our own platforms."
      features={features}
      capabilitiesSubtext="Tools and standards we deliver with across banks, capital markets, government, and enterprises."
      capabilities={capabilities}
      insightsCategory="BI & Data"
    />
  )
}
