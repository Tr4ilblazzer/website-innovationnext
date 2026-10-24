'use client'


import { SolutionPageTemplate } from '@/components/sections/SolutionPageTemplate'

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

const toolGroups = [
  { title: 'BI Tools', tools: [
    { name: 'Power BI', file: 'power-bi' }, { name: 'Tableau', file: 'tableau' },
    { name: 'Qlik', file: 'qlik' }, { name: 'SAS', file: 'sas' },
  ] },
  { title: 'Data Warehousing', tools: [
    { name: 'Snowflake', file: 'snowflake' }, { name: 'Amazon Redshift', file: 'redshift' },
    { name: 'Azure Synapse', file: 'synapse' }, { name: 'Google BigQuery', file: 'bigquery' },
  ] },
  { title: 'Data Orchestration', tools: [
    { name: 'Azure Data Factory', file: 'azure-data-factory' }, { name: 'Google Dataflow', file: 'google-dataflow' },
    { name: 'AWS Glue', file: 'aws-glue' },
  ] },
  { title: 'Big Data', tools: [
    { name: 'Amazon EMR', file: 'amazon-emr' }, { name: 'Apache Spark', file: 'spark' },
    { name: 'Databricks', file: 'databricks' }, { name: 'PySpark', file: 'pyspark' },
  ] },
  { title: 'Databases', tools: [
    { name: 'Snowflake', file: 'snowflake' }, { name: 'MongoDB', file: 'mongodb' },
    { name: 'MySQL', file: 'mysql' }, { name: 'SQL Server', file: 'sql-server' },
    { name: 'PostgreSQL', file: 'postgresql' }, { name: 'Amazon RDS', file: 'amazon-rds' },
  ] },
  { title: 'Data Lakes', tools: [
    { name: 'Amazon S3', file: 'amazon-s3' }, { name: 'Azure Data Lake', file: 'azure-data-lake' },
  ] },
]

export default function BiDataSolutionPage() {
  return (
    <SolutionPageTemplate
      title="BI & Data Solutions"
      description="We build data warehouses, pipelines and dashboards for banks, capital-market firms, government and large enterprises. Data from your different systems is brought together, cleaned in stages, and delivered through Power BI, custom dashboards and APIs. More than 50 dashboards are in use today."
      heroImage="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&q=80"
      heroImageAlt="Business intelligence and data"
      featuresSubheadline="One view of data from multiple sources, KPIs defined by you, ready in Power BI and available to every system of yours."
      features={features}
      capabilitiesSubtext="Tools and standards we deliver with across banks, capital markets, government, and enterprises."
      capabilities={capabilities}
      insightsCategory="BI & Data"
    >
      <section className="bg-[#F7F7F7] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <p className="text-xs font-medium mb-2" style={{ color: '#0A4FD6' }}>How it works</p>
            <h2 className="section-heading text-[#0A0A0A] mb-3">
              How your data <span className="section-accent">flows</span>
            </h2>
            <p className="text-[#0A0A0A]/60 text-base leading-relaxed">
              Data comes in from your systems, is cleaned in three stages, and goes out to the dashboards, portals and apps your teams use.
            </p>
          </div>
          <div className="rounded-3xl bg-white p-6 md:p-10">
            <img
              src="/bi-data-flow.png"
              alt="Data architecture: structured, unstructured, RDBMS and ERP sources feed an ingest engine into a data lake with landing, intermediate and marts layers, with a transform engine and analytical sandbox, delivered through a quick access store to AI/ML, business intelligence, web/API/portal and mobile applications"
              className="w-full h-auto mx-auto"
            />
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-3xl mx-auto text-center">
            <p className="text-xs font-medium mb-2" style={{ color: '#0A4FD6' }}>Tools</p>
            <h2 className="section-heading text-[#0A0A0A] mb-3">
              Tools we <span className="section-accent">work with</span>
            </h2>
            <p className="text-[#0A0A0A]/60 text-base leading-relaxed">
              We build on the platform you already use, or help you pick one.
            </p>
          </div>
          <div className="max-w-5xl mx-auto divide-y divide-[#0A0A0A]/10 border-y border-[#0A0A0A]/10">
            {toolGroups.map(g => (
              <div key={g.title} className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 py-7">
                <h3 className="md:w-64 shrink-0 text-lg font-medium text-[#0A0A0A]">{g.title}</h3>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                  {g.tools.map(t => (
                    <img key={t.name} src={`/bi-tools/${t.file}.png`} alt={t.name} className="h-9 w-auto object-contain" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SolutionPageTemplate>
  )
}
